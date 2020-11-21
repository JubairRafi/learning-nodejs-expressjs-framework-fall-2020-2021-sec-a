const express = require("express")
const { Result } = require("express-validator")
const userModel = require.main.require("./models/userModel")
const router = express.Router()


//route root : /admin/seller

router.get('*',(req,res,next)=>{    // GET : (*)
	if(req.cookies['uname'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})

router.get("/",(req,res)=>{
    userModel.getSeller(result=>{
        if (result) {
            res.render("admin/sellerList",{sellerInfo:result,loogedName: req.cookies['uname']})
        }
        
    })
    
})
router.get("/delete/:id",(req,res)=>{
    const uid = req.params.id;
    userModel.dltseller(uid,result=>{
        if (result) {
            userModel.dltUser(uid,result=>{
                if (result) {
                    res.redirect('/admin/seller')
                }
            })
        }
    })
    
})

router.get("/block/:id",(req,res)=>{
    const uid = req.params.id;
    userModel.blockseller(uid,result=>{
      if (result) {
        res.redirect('/admin/seller')
      }
         
    })
   
    
})

router.get("/unblock/:id",(req,res)=>{
    const uid = req.params.id;
    userModel.unblockseller(uid,result=>{
      if (result) {
        res.redirect('/admin/seller')
      }
         
    })
    
})

router.get("/addSeller",(req,res)=>{
    res.render("admin/addSeller",{loogedName: req.cookies['uname']})
})

router.post("/addSeller",(req,res)=>{
    const user = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.password,
        type: "Seller"
    }
    userModel.createUser(user,status=>{
        userModel.getUserBy(user,result=>{
            const uid = result[0].user_id;
            console.log(uid);
            userModel.createSeller(uid,user,status=>{
                res.redirect('/admin')
            })
        })
        
    })
})

router.get("/edit",(req,res)=>{
    res.render("admin/editSeller",{loogedName: req.cookies['uname']})
})



module.exports = router;