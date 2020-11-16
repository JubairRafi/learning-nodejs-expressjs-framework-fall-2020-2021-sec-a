const express = require("express")
const { body, validationResult, Result } = require('express-validator'); 
const userModel = require.main.require("./models/userModel")
const adminModel = require.main.require("./models/adminModel")
const router 	= express.Router();


router.post("*",[				  //POST : ("*")
	body('email').isEmail(),
	
    body('password').isLength({ min: 5 }),
    body('cpassword').isLength({ min: 5 })
    
	],(req, res,next)=>{

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}else{
			next()
		}
	
    })
    

router.get("/",(req,res)=>{
    res.render("admin/index",{loggedName:req.cookies['uname']})
})

router.get("/registration",(req,res)=>{
    res.render("admin/register");
})

router.post("/registration",(req,res)=>{
    const adminInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        contact:req.body.contact,
        type: "admin"
    }

    adminModel.insert(adminInfo,status=>{
        if (status) {
            userModel.insert(adminInfo,status=>{
                    if (status) {
                        res.redirect("/admin")
                    }else{
                        res.redirect("/admin/registration")
                    }
                })
        }else{
            res.redirect("/admin/registration")
        }
    })

    

    
})

module.exports = router;