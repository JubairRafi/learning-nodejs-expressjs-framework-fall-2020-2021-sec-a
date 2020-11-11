const express 	= require('express');
const mysql = require('mysql');
const db = require('../models/db');
const router 	= express.Router();

router.get('/registration', (req, res)=>{
	
	if(req.cookies['uname'] != ""){
		res.render('employer/regi');
	}else{
		res.redirect('/login');
	}
});

router.post('/registration', (req, res)=>{
	
	
		  
		  var sql = "insert into user values('','"+req.body.employerName+"','"+req.body.companyName+"','"+req.body.contactNo+"', '"+req.body.username+"',  '"+req.body.password+"')";
				db.getResults(sql,(results)=>{
					if (results) {
						res.redirect("/home")
					}else{
						res.send("registration failed")
					}
					
				})
				
		 
});

router.get('/edit/:id', (req, res)=>{

	//res.send(req.params.id + "<br>"+ req.params.name);
	
	if(req.cookies['uname'] != ""){
		
		const id = req.params.id;
		console.log("id",id);
	
		req.session.userlist.forEach((e,i)=>{
			
			if((i+1)==id){
				
				editUser = e;
			
			}
		})
		console.log(editUser);

		res.render('employer/edit', {user:editUser});
	}else{
		res.redirect('/login');
	}
});

router.post('/edit/:id', (req, res)=>{
		const uname = req.body.username;
		const pass = req.body.password;
		const email = req.body.email;

		const id = req.params.id;
	if(req.cookies['uname'] != ""){
		
		 req.session.userlist[id-1][0] = uname;
		 req.session.userlist[id-1][1] = pass;
		 req.session.userlist[id-1][2] = email;
		
		console.log("check", req.session.userlist);
		res.redirect('/home/employerlist');
	}else{
		res.redirect('/login');
	}
});

router.get('/delete/:id', (req, res)=>{
	const id = req.params.id;
	
	if(req.cookies['uname'] != ""){

		req.session.userlist.forEach((e,i)=>{
			
			if((i+1)==id){
				
				dltUser = e;
			
			}
		})
		console.log(dltUser);
		res.render('employer/delete',{user:dltUser});
	}else{
		res.redirect('/login');
	}
});


router.post('/delete/:id', (req, res)=>{
	const id = req.params.id;
	const index = id-1
	
	if(req.cookies['uname'] != ""){
		//res.send('done!');
		req.session.userlist.splice(index,1);
		
		res.redirect('/home/employerlist');
	}else{
		res.redirect('/login');
	}
});

module.exports = router;

