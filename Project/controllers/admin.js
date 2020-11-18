const express = require("express")
const router = express.Router()
const event = require.main.require("./controllers/event")
const seller = require.main.require("./controllers/seller")
const retailManager = require.main.require("./controllers/retailManager")


router.use("/event",event)
router.use("/seller",seller)
router.use("/retailManager",retailManager)


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