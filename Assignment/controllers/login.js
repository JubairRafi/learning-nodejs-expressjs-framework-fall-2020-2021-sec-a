
const express = require("express")
const { body, validationResult } = require('express-validator'); 
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
	res.render('login/index');
});

router.post("/",(req,res)=>{ //POST:/login
    const user ={
        username : req.body.email,
        password : req.body.pass
    }

    userModel.validate(user,status=>{
        if (status) {
            res.cookie('uname', req.body.email)
            res.redirect("/")
        }else{
            res.redirect("/login")
        }
    })
})


module.exports = router;