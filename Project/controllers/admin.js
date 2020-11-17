const express = require("express")
const router = express.Router()


//route root : /admin

router.get("/",(req,res)=>{
    res.render("admin/index")
})

router.get("/registration", (req,res)=>{
    res.render('admin/register')
})

module.exports = router;