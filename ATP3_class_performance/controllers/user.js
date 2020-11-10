const express 	= require('express');
const router 	= express.Router();

router.get('/create', (req, res)=>{
	
	if(req.cookies['uname'] != ""){
		res.render('user/create');
	}else{
		res.redirect('/login');
	}
});

router.post('/create', (req, res)=>{
	
	if(req.cookies['uname'] != ""){
		
		var user = [req.body.username, req.body.password, req.body.email];
		 req.session.userlist.push(user);
		// newlist.push(user);
		console.log(user,req.session.userlist);
		// req.session.userlist = newlist;
		
		res.send('New user info:'+
					"<br> Username: "+req.body.username+
					"<br> Password: "+req.body.password+
					"<br> Email: "+req.body.email
				);
	}else{
		res.redirect('/login');
	}
});

router.get('/edit/:id', (req, res)=>{

	//res.send(req.params.id + "<br>"+ req.params.name);
	
	if(req.cookies['uname'] != ""){
		
		const id = req.params.id;
		console.log("id",id);
		var user = {
			username: 'test',
			password: 'test',
			email: 'alamin@aiub.edu'
		};

		req.session.userlist.forEach((e,i)=>{
			
			if((i+1)==id){
				
				editUser = e;
			
			}
		})
		console.log(editUser);

		res.render('user/edit', {user:editUser});
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
		res.redirect('/home/userlist');
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
		res.render('user/delete',{user:dltUser});
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
		
		res.redirect('/home/userlist');
	}else{
		res.redirect('/login');
	}
});

module.exports = router;

