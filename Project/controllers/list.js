const express = require("express")
const router = express.Router()


//route root : /admin/list

router.get("/product",(req,res)=>{
    res.render("admin/productList")
})
router.get("/catagory",(req,res)=>{
    res.render("admin/catagoryList")
})
router.get("/order",(req,res)=>{
    res.render("admin/orderList")
})






module.exports = router;