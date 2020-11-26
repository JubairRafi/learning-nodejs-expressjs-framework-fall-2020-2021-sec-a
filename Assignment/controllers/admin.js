const express = require("express")
const { body, validationResult, Result } = require('express-validator'); 
const userModel = require.main.require("./models/userModel")
const adminModel = require.main.require("./models/adminModel")
const medicineModel = require.main.require("./models/medicineModel")
const router 	= express.Router();

router.get('*',(req,res,next)=>{    // GET : (*)
	if(req.cookies['uname'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})


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
    

router.get("/",(req,res)=>{                 // GET :/admin
    res.render("admin/index",{loggedName:req.cookies['uname'],layout:'./layouts/admin'})
})

router.get("/registration",(req,res)=>{   // GET : /admin/registration
    res.render("admin/register",{layout:'./layouts/form'});
})

router.post("/registration",(req,res)=>{  // POST : /admin/registration
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

router.get("/medicine",(req,res)=>{  //GET : /ADMIN/medicine

    medicineModel.getAllMedicine(results=>{
        res.render("admin/medicine",{loggedName:req.cookies['uname'],medicines:results,layout:'./layouts/admin'})
    })
    
})

router.get("/medicine/delete/:id",(req,res)=>{  //GET : /ADMIN//medicine/delete/:id
    const id = req.params.id;
    medicineModel.deleteMedicine(id,status=>{
        if (status) {
            res.redirect("/admin/medicine")
        }
        
    })
    
})

module.exports = router;