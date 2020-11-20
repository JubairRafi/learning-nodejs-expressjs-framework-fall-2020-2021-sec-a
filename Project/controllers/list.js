const express = require("express")
const productModel = require.main.require("./models/productModel")
const router = express.Router()



//route root : /admin/list

router.get('*',(req,res,next)=>{    // GET : (*)
	if(req.cookies['uname'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})

router.get("/product",(req,res)=>{
    productModel.getProduct(results=>{ 
        res.render("admin/productList",{productInfo:results,pModel:productModel,loogedName: req.cookies['uname']})
    })
    
})
router.get("/catagory",(req,res)=>{
    res.render("admin/catagoryList",{loogedName: req.cookies['uname']})
})
router.get("/order",(req,res)=>{
    res.render("admin/orderList",{loogedName: req.cookies['uname']})
})




module.exports = router;