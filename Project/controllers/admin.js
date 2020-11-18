const express = require("express")
const router = express.Router()
const event = require.main.require("./controllers/event")


router.use("/event",event)


//route root : /admin

router.get("/",(req,res)=>{
    res.render("admin/index")
})

router.get("/registration", (req,res)=>{
    res.render('admin/register',{layout:'./layouts/registration'})
})

router.get("/profile", (req,res)=>{
    res.render('admin/profile')
})

module.exports = router;