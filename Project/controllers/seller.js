const express = require("express")
const router = express.Router()


//route root : /admin/seller

router.get("/",(req,res)=>{
    res.render("admin/sellerList",{loogedName: req.cookies['uname']})
})


router.get("/addSeller",(req,res)=>{
    res.render("admin/addSeller",{loogedName: req.cookies['uname']})
})
router.get("/edit",(req,res)=>{
    res.render("admin/editSeller",{loogedName: req.cookies['uname']})
})



module.exports = router;