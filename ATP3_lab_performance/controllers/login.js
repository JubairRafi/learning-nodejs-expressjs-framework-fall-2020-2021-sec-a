const express 	= require('express');
const { body, validationResult } = require('express-validator'); 
const employerModel = require.main.require("./models/employerModel")
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post("*",[				 
	body('username').isEmail(),
	
	body('password').isLength({ min: 5 })
	],(req, res,next)=>{

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}else{
			next()
		}
	
	})

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



