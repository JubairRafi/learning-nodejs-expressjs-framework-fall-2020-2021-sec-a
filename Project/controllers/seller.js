const express = require("express")
const router = express.Router()


//route root : /admin/seller

router.get("/",(req,res)=>{
    res.render("admin/sellerList")
})


router.get("/addSeller",(req,res)=>{
    res.render("admin/addSeller")
})



module.exports = router;