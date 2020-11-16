const express = require("express")
const { body, validationResult, Result } = require('express-validator'); 
const userModel = require.main.require("./models/userModel")
const router 	= express.Router();



router.get("/",(req,res)=>{
    res.render("home/index")
})



router.get("/shop",(req,res)=>{
    res.render("home/shop")
})


module.exports = router;