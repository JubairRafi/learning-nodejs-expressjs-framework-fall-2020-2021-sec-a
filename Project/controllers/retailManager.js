const express = require("express")
const router = express.Router()


//route root : /admin/retailManager

router.get("/",(req,res)=>{
    res.render("admin/retailManagerList")
})


router.get("/retailManagerRegistration",(req,res)=>{
    res.render("admin/register")
})



module.exports = router;