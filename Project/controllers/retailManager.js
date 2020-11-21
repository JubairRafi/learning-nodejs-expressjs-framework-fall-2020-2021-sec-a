const express = require("express")
const { Result } = require("express-validator")
const router = express.Router()

//controler
const userModel = require.main.require("./models/userModel")

//route root : /admin/retailManager

router.get('*',(req,res,next)=>{    // GET : (*)
	if(req.cookies['uname'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})

router.get("/",(req,res)=>{
    userModel.getRetailseller(result=>{
        const retailseller = result;
        if (result) {
            res.render("admin/retailManagerList",{retailsellerInfo:retailseller,loogedName: req.cookies['uname']})
        }
    })
    
})


router.get("/retailManagerRegistration",(req,res)=>{
    res.render("admin/register")
})

router.get("/delete/:uid",(req,res)=>{
    const uid = req.params.uid;
    userModel.dltretailseller(uid,status=>{
        console.log(status);
        if (status) {
            userModel.dltUser(uid,status=>{
                if (status) {
                    res.redirect("/admin");
                }
            })
        }
    })
    
})



module.exports = router;