const express 	= require('express');
const mysql = require("mysql");
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

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
		  
		  var sql = "select * from user where username='"+req.body.username+"' and password='"+req.body.password+"'";
			  
		  connection.query(sql,(err,results)=>{
			  	res.cookie('uname',req.body.username);
				res.redirect("/home")
		  });
		  connection.end((err)=>{
			  console.log("connection ended");
		  })
}); 


module.exports = router;



