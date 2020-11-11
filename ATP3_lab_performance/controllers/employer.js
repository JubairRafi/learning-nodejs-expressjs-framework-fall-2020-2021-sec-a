const express 	= require('express');
const employerModel = require.main.require("./models/employerModel")
const router 	= express.Router();

router.get("*",(req,res,next)=>{
	if(req.cookies['uname'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})

router.get('/registration', (req, res)=>{
	
	
		res.render('employer/regi');
	
});

router.post('/registration', (req, res)=>{
	
	
		  
		  var employer = {
			employerName: req.body.employerName,
			companyName: req.body.companyName,
			contactNo: req.body.contactNo,
			username: req.body.username,
			password: req.body.password
		  }
				

				employerModel.insert(employer,status=>{
					if (status) {
						res.redirect("/home")
					}else{
						res.send("registraion failed")
					}
					
				})
				
		 
});

router.get('/edit/:id', (req, res)=>{

		
		const id = req.params.id;
		console.log("id",id);
	
		employerModel.getByID(id,results=>{
			res.render('employer/edit', {employer:results[0]});
		})
		
});

router.post('/edit/:id', (req, res)=>{
		const employerEditedInfo = {
			employerName: req.body.employerName,
			companyName: req.body.companyName,
			contact:req.body.contact,
			username: req.body.username,
			password: req.body.password
		}
	
		const id = req.params.id;
		employerModel.update(id,employerEditedInfo,status=>{
			if (status) {
				res.redirect('/home/employerlist');
			}else{
				res.send("update failed")
			}
		})
		
		
	
});

router.get('/delete/:id', (req, res)=>{
	const id = req.params.id;

			employerModel.getByID(id,results=>{
				res.render('employer/delete',{employer:results[0]});
			})
		
});


router.post('/delete/:id', (req, res)=>{
	const id = req.params.id;

		employerModel.delete(id,status=>{
			if (status) {
				res.redirect('/home/employerlist');
			}else{
				res.send("deleting failed")
			}
		})
		
	
});

module.exports = router;

