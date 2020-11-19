const express = require("express")
const { Result } = require("express-validator")
const fileUpload = require('express-fileupload')
const router = express.Router()
const event = require.main.require("./controllers/event")
const seller = require.main.require("./controllers/seller")
const retailManager = require.main.require("./controllers/retailManager")
const list = require.main.require("./controllers/list")

//models
const adminModel = require.main.require("./models/adminModel")
const userModel = require.main.require("./models/userModel")



//controllers
router.use("/event",event)
router.use("/seller",seller)
router.use("/retailManager",retailManager)
router.use("/list",list)
// default options
router.use(fileUpload());


//route root : /admin

router.get('*',(req,res,next)=>{    // GET : (*)
	if(req.cookies['uname'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})


router.get("/",(req,res)=>{
    res.render("admin/index",{loogedName: req.cookies['uname']})
})

router.get("/registration", (req,res)=>{
    res.render('admin/register',{layout:'./layouts/registration'})
})

router.get("/profile", (req,res)=>{  //GET : /admin/profile
    adminModel.getAdmin(result=>{
        res.render('admin/profile',{adminInfo:result[0],loogedName: req.cookies['uname']})
    })
   
})

router.post("/profile", (req,res)=>{  //POST : /admin/profile
    const uid = req.cookies['uid'];
    const id = 1
    const user = {
        name:req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        pp:req.body.profilePic

    }
    //file upload test
  
    let sampleFile = req.files.profilePic;
    const p = req.cookies['up'];
    console.log(sampleFile.name);
    sampleFile.mv(p+'/sampleFile.jpg', function(err) {
        if (err)
        return res.status(500).send(err);
      });


    res.cookie('uname', user.email)

    userModel.updateAdmin(user,uid,status=>{
        if(status){
            adminModel.updateAdmin(user,id,status=>{
                if (status) {
                    res.redirect('/admin')
                }//else needed some work
            })
        }
    })
    
})

router.get("/customer", (req,res)=>{
    res.render('admin/customer')
})

router.get("/verifySeller", (req,res)=>{
    res.render('admin/verifySeller')
})
router.get("/report", (req,res)=>{
    res.render('admin/report')
})


module.exports = router;