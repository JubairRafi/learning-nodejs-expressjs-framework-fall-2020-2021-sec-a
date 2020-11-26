const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
	res.clearCookie('uname');
	res.clearCookie('uid')
	res.clearCookie('cid')
	res.redirect('/login');
});


module.exports = router;



