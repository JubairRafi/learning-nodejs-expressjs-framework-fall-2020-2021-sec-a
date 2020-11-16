const express = require("express")
const { body, validationResult, Result } = require('express-validator'); 
const userModel = require.main.require("./models/userModel")
const customerModel = require.main.require("./models/customerModel")
const router 	= express.Router();



router.get("/",(req,res)=>{
    var uname = req.cookies['uname'];
    if (uname ==null) {
        res.render("home/index",{loggedName : uname})
    }else{
        userModel.getuser(uname,result=>{
            console.log(result,uname);
            res.cookie('uid', result[0].id)
            customerModel.getCustomer(uname,result=>{
                console.log(result);
                res.render("home/index",{loggedName : uname, cid:result[0].id})
            })
            
        })
    }
    
})

router.get("/profile/:id",(req,res)=>{
    const id = req.params.id;
    customerModel.getCustomerById(id,result=>{
        console.log(result[0]);
        res.render("home/cusProfile",{cusInfo:result[0]})
    })
    
    
})

router.post("/profile/:id",(req,res)=>{
    const customerInfo = {
        id:req.params.id,
        customerName: req.body.customerName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        contact:req.body.contact,
        type: "customer"
    }
    res.clearCookie('uname');
    res.cookie('uname', customerInfo.email)

    customerModel.update(customerInfo,status=>{
        if (status) {
            const uid = req.cookies['uid'];
            userModel.updateCusToUser(customerInfo,uid,status=>{
                    if (status) {
                        res.redirect("/home")
                    }else{
                        res.send("UPDATE FAILED")
                    }
                })
        }else{
            res.redirect("/home")
        }
    })
})



router.get("/shop",(req,res)=>{
    res.render("home/shop")
})


module.exports = router;