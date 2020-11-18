const express = require("express")
const router = express.Router()


//route root : /admin/event

router.get("/",(req,res)=>{

    res.render("admin/pastEvent")
})


router.get("/addEvent",(req,res)=>{
    res.render("admin/addEvent")
})



module.exports = router;