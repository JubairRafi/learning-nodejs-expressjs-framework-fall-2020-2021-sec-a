const express 	= require('express');
const employerModel = require.main.require("./models/employerModel")
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

		  var employer = {
        username: req.body.username,
        password: req.body.password
      }

      employerModel.validate(employer,status=>{
        if (status) {
          res.cookie('uname', req.body.username)
          res.redirect("/home")
        }else{
          res.redirect("/login")
        }
      })
		  
}); 


module.exports = router;



