const express = require("express")
const router = express.Router()


//route root : /admin/event

router.get("/",(req,res)=>{

    res.render("admin/pastEvent",{loogedName: req.cookies['uname']})
})


router.get("/addEvent",(req,res)=>{
    res.render("admin/addEvent",{loogedName: req.cookies['uname']})
})



module.exports = router;