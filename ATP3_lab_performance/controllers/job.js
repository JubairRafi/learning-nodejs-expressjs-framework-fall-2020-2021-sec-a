const express 	= require('express');
const jobModel = require('../models/jobModel');
const job = require.main.require("./models/jobModel");
const router 	= express.Router();

router.get('*',(req,res,next)=>{
	if(req.cookies['uname'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})

router.get('/add',(req,res)=>{
	res.render("job/add")
})

router.post('/add',(req,res)=>{
    const job ={
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        location: req.body.location,
        salary : req.body.salary
    }

    jobModel.insert(job,status=>{
        if (status) {
            res.redirect("/home/job");
        }else{
            res.send("failed to add jobs")
        }
    })

})



module.exports = router;