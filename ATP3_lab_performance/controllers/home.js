const express 	= require('express');
const mysql = require('mysql');
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

		var connection = mysql.createConnection({
			host     :'127.0.0.1',
			database :'jobportal',
			user     :'root',
			password : ''
			});
			
			connection.connect(function(err) {
				if (err) {
				  console.error('error connecting: ' + err.stack);
				  return;
				}
			   
				console.log('connected as id ' + connection.threadId);
			  });
			  
			  var sql = "select * from user";
				  
			  connection.query(sql,(err,results)=>{
					  res.render('home/employerlist', {users: results });
	
			  });
			  connection.end((err)=>{
				  console.log("connection ended");
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
