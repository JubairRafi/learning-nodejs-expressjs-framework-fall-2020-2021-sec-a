const express 	= require('express');
const jobModel = require.main.require("./models/jobModel");
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

router.get('/update/:id',(req,res)=>{
    const id = req.params.id;

    jobModel.getById(id,results=>{
        res.render("job/update",{jobEdit:results[0]})
    })

})

router.post('/update/:id',(req,res)=>{
    const id = req.params.id;
    const job ={
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        location: req.body.location,
        salary : req.body.salary
    }

    jobModel.update(id,job,status=>{
        if (status) {
            res.redirect("/home/job");
        }else{
            res.send("failed to update")
        }

    })

})

router.get('/delete/:id',(req,res)=>{
    const id = req.params.id;
   

    jobModel.delete(id,status=>{
        if (status) {
            res.redirect("/home/job");
        }else{
            res.send("failed to delete")
        }

    })

})



module.exports = router;