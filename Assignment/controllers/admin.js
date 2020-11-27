const express = require("express")
var jwt = require('jsonwebtoken');
const { body, validationResult, Result } = require('express-validator'); 
const userModel = require.main.require("./models/userModel")
const customerModel = require.main.require("./models/customerModel")
const adminModel = require.main.require("./models/adminModel")
const medicineModel = require.main.require("./models/medicineModel")
const verifyToken = require('./auth');
const router 	= express.Router();

router.get('*',(req,res,next)=>{    // GET : (*)
	if(req.cookies['uname'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})



router.get("/",verifyToken,(req,res)=>{  
      jwt.verify(req.cookies['token'],'secret',(err,authData)=>{
          if (err) {
              res.sendStatus(403)
          }else{
              customerModel.getAllcustomer(results=>{
                  const customerInfo = results;
                  res.render("admin/index",{customerInfo,loggedName:req.cookies['uname'],layout:'./layouts/admin'})
              })
           
          }
      })
    
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

router.get("/addMed",(req,res)=>{  
    res.render('admin/addMed',{loggedName:req.cookies['uname'],layout:'./layouts/form'})  
})
router.post("/addMed",(req,res)=>{  
    const med = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        catagory: req.body.catagory,
        vendorname: req.body.vendorname
    
    }
    medicineModel.addMedicine(med,status=>{
        if (status) {
            res.redirect("/admin/medicine")
        }
        
    })
    
})

router.get("/edit/:id",(req,res)=>{  
    const id = req.params.id;
    console.log(id);

    medicineModel.getMedicine(id,results=>{
        console.log(results);
        if (results) {

            res.render("admin/editMed",{med:results[0],layout:'./layouts/form'})
        }else{
            res.json("getnot get med")
        }
        
    })
       
    
})

router.post("/edit/:id",(req,res)=>{  //GET : /ADMIN//medicine/delete/:id

    const med = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        id: req.params.id,
    }
    medicineModel.editMedicine(med,status=>{
        if (status) {
            res.redirect("/admin/medicine")
        }
        
    })
    
})

router.post("/customer/delete",(req,res)=>{  //GET : /ADMIN//medicine/delete/:id

    const id =req.body.userId;
    console.log(id);
    customerModel.dltcustomer(id,status=>{
        if (status) {
            res.redirect("/admin/medicine")
        }
        
    })
    
})



module.exports = router;