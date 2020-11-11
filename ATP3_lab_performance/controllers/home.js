const express 	= require('express');
const db = require.main.require("./models/db")
const router 	= express.Router();




router.get('/', (req, res)=>{

	if(req.cookies['uname'] != null){
		res.render('home/index',{name:req.cookies['uname']});		
	}else{
		res.redirect('/login');
	}
});


router.get('/employerlist', (req, res)=>{

	if(req.cookies['uname'] != ""){

		var sql = "select * from user";
	
		db.getResults(sql,(results)=>{
			res.render('home/employerlist', {users: results });
		})

	}else{
		res.redirect('/login');
	}
})

module.exports = router;

//url design eg. /logout -> get or post request
//adding middleware to app.js
//creating controller/router  eg. router.get(), router.post()
//creating VIEWS
//sending response -> json, ejs
