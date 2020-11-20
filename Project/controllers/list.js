const express = require("express")
const router = express.Router()


//route root : /admin/list

router.get("/product",(req,res)=>{
    res.render("admin/productList",{loogedName: req.cookies['uname']})
})
router.get("/catagory",(req,res)=>{
    res.render("admin/catagoryList",{loogedName: req.cookies['uname']})
})
router.get("/order",(req,res)=>{
    res.render("admin/orderList",{loogedName: req.cookies['uname']})
})






module.exports = router;