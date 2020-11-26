
const express = require("express")
var jwt = require('jsonwebtoken');
const { body, validationResult} = require('express-validator'); 
const userModel = require.main.require("./models/userModel")
const router 	= express.Router();

router.post("*",[				  //POST : ("*")
	body('email').isEmail(),
	
	body('pass').isLength({ min: 5 })
	],(req, res,next)=>{

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}else{
			next()
		}
	
	})


router.get('/', (req, res)=>{ //GET:/login
	res.render('login/index',{layout:'./layouts/form'});
});

router.post("/",(req,res)=>{ //POST:/login
    const user ={
        username : req.body.email,
        password : req.body.pass
    }

    userModel.validate(user,results=>{

        jwt.sign({user},'secret',(err,token)=>{
            res.cookie('token',token)
            console.log(req.cookies['token']);
            if (results) {
                if (results[0].type=="admin") {
                    res.cookie('uname', req.body.email)
                    console.log(results[0].type);
                    res.redirect("/admin")
                }else if(results[0].type=="customer"){
                    res.cookie('uname', req.body.email)
                    console.log(results[0].type);
                    res.redirect("/home")
                }
                else{
                    res.redirect("/login")  
                }
            }else{
                res.redirect("/login") 
            }
        })

        
        
    })
})




module.exports = router;