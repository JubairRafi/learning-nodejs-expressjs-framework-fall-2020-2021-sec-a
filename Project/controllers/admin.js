const express = require("express")
const router = express.Router()
const event = require.main.require("./controllers/event")
const seller = require.main.require("./controllers/seller")
const retailManager = require.main.require("./controllers/retailManager")
const list = require.main.require("./controllers/list")


router.use("/event",event)
router.use("/seller",seller)
router.use("/retailManager",retailManager)
router.use("/list",list)


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

router.get("/customer", (req,res)=>{
    res.render('admin/customer')
})

router.get("/verifySeller", (req,res)=>{
    res.render('admin/verifySeller')
})
router.get("/report", (req,res)=>{
    res.render('admin/report')
})


module.exports = router;