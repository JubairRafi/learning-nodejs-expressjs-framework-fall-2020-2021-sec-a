const express 	= require('express');
const employerModel = require.main.require("./models/employerModel")
const router 	= express.Router();


router.get('*',(req,res,next)=>{
	if(req.cookies['uname'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})

router.get('/', (req, res)=>{

		res.render('home/index',{name:req.cookies['uname']});		
});


router.get('/employerlist', (req, res)=>{


		employerModel.getAllEmployer(results=>{
			res.render('home/employerlist', {users: results });
		})

	
})

module.exports = router;


