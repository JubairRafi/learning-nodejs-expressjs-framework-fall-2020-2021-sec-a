const express = require("express")
const { Result } = require("express-validator")
const router = express.Router()


const adminModel = require.main.require("./models/adminModel")

//route root : /admin/event

router.get("/",(req,res)=>{
    adminModel.pastEvent(result=>{
        const event = result;
        if (result) {
            res.render("admin/pastEvent",{eventInfo:event,loogedName: req.cookies['uname']})
        }
    })

    
})


router.get("/addEvent",(req,res)=>{
    res.render("admin/addEvent",{loogedName: req.cookies['uname']})
})



module.exports = router;