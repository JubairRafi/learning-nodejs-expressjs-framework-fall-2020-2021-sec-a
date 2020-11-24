const express = require("express")
const { check, validationResult} = require('express-validator'); 
const fileUpload = require('express-fileupload')
const moment = require('moment')
var jsPDF = require('jspdf');
require('jspdf-autotable');
const fs = require('fs');
const { report } = require("./sellerA");
const router = express.Router()
const event = require.main.require("./controllers/event")
const seller = require.main.require("./controllers/sellerA")
const retailManager = require.main.require("./controllers/retailManager")
const list = require.main.require("./controllers/list")

//models
const adminModel = require.main.require("./models/admin/adminModel")
const userModel = require.main.require("./models/admin/userModel")
const productModel = require("../models/admin/productModel");

var shortDateFormat = "YYYY-MM-DD";

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
    const data = fs.readFileSync('./models/admin/runningevent.json')
    const jsonEventData= JSON.parse(data);
    
    userModel.getUser(result=>{
        const user =result;
        res.render("admin/index",{userInfo:user,runningEvent:jsonEventData,loogedName: req.cookies['uname']})
    })
    
})

// router.get("/registration", (req,res)=>{
//     res.render('admin/register',{layout:'./layouts/registration'})
// })
router.get("/registrationRetailer", (req,res)=>{
    res.render('admin/register',{layout:'./layouts/registration'})
})

router.post("/registrationRetailer",[				  //POST : 
    check('name','name must be atleast 5+ character long')
        .exists()
        .isLength({min:5}),
	
    check('email','Must be a vaid Email')
        .exists()
        .isEmail(),
    check('password','password must be atleast 5+ character long')
        .exists()
        .isLength({min:5}),
    check('password','password must be atleast 5+ character long')
        .exists()
        .isLength({min:5})
        
	],(req, res,next)=>{

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            const alert = errors.array();
            res.render('admin/register',{alert,layout:'./layouts/registration'})
		}else{
			next()
		}
	
	})

router.post("/registrationRetailer", (req,res)=>{
    const retailseller = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.password,
        cpass: req.body.cpassword,
        type: "retailSeller"
    }
    userModel.createUser(retailseller,status=>{
        userModel.getUserBy(retailseller,result=>{
            const uid = result[0].user_id;
            console.log(uid);
            userModel.createRetailseller(uid,retailseller,status=>{
                res.redirect('/admin')
            })
        })
        
    })

})

router.get("/profile", (req,res)=>{  //GET : /admin/profile
    adminModel.getAdmin(result=>{
        res.render('admin/profile',{adminInfo:result[0],loogedName: req.cookies['uname']})
    })
   
})

router.post("/profile", (req,res)=>{  //POST : /admin/profile
    const aid = req.cookies['aid'];
    const id = 1
    const user = {
        name:req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        pp:req.files.profilePic

    }
    //file upload test
    console.log(user.pp);
  
    let sampleFile = user.pp;
    const p = req.cookies['up'];
    sampleFile.mv(p+'/sampleFile.jpg', function(err) {
        if (err)
        return res.status(500).send(err);
      });


    res.cookie('uname', user.email)
            adminModel.updateAdmin(user,id,status=>{
                if (status) {
                    res.redirect('/admin')
                }//else needed some work
            })
})

router.get("/customer/:id", (req,res)=>{
    const cid = req.params.id;
    userModel.getCustomerByID(cid,result=>{
        console.log(result);
        res.render('admin/customerBan',{customer:result[0],loogedName: req.cookies['uname']})
    })
    
})

router.post("/customer/:id", (req,res)=>{
    const cid = req.params.id;
    userModel.banCustomer(cid,result=>{
        console.log(result);
        res.redirect("/admin/customer")
    })
    
})
router.get("/customer/unban/:id", (req,res)=>{
    const cid = req.params.id;
    userModel.unbanCustomer(cid,result=>{
        console.log(result);
        res.redirect("/admin/customer")
    })
    
})
router.get("/customer", (req,res)=>{
    userModel.getCustomer(result=>{
        console.log(result);
        res.render('admin/customer',{customerInfo:result,loogedName: req.cookies['uname']})
    })
})

router.get("/verifySeller", (req,res)=>{
    userModel.getSeller(result=>{
        const seller = result;
        res.render('admin/verifySeller',{sellerInfo:seller,loogedName: req.cookies['uname']})
    })
    
})


router.get("/verifySeller/:id", (req,res)=>{
    const sid = req.params.id;
    userModel.verifySeller(sid,result=>{
        res.redirect('/admin/verifySeller')
    })
    
})

router.post("/verifySeller", (req,res)=>{
    const sid = req.body.userId;
    console.log(sid);
    userModel.verifySeller(sid,result=>{
        if (result) {
            res.json({
                sv:"seller verification Done"
            })
        }else{
            res.json({
                sv:"seller verification failed"
            })
        }
       
    })
    
})
router.get("/report", (req,res)=>{
    userModel.getReport(result=>{
        const report = result;
        userModel.getCustomer(result=>{
            const customer = result;
            userModel.getSeller(result=>{
                const seller = result;
                userModel.getRetailseller(result=>{
                    const retailseller = result;
                    res.render('admin/report',{reportInfo:report,customerInfo:customer,sellerInfo:seller,retailsellerInfo:retailseller,loogedName: req.cookies['uname']})
                })
            })
        })
    })
    
})

router.get("/report/delete/:id",(req,res)=>{
    const id = req.params.id;
    userModel.dltReport(id,status=>{
        if (status) {
            res.redirect("/admin")
        }
        
    })
})
router.post("/report/delete",(req,res)=>{
    const id = req.body.userId;
    userModel.dltReport(id,status=>{
        if (status) {
            res.json({
                r:"reported"
            })
        }else{
            res.json({
                r:"report deleted"
            })
        }
        
    })
})

router.get('/revenue',(req,res)=>{
  
        var d = new Date();
       
       const revDate = {
           priviousMonth:moment(d.setMonth(d.getMonth() - 1)).format('MMMM'),
           priviousMonth1:moment(d.setMonth(d.getMonth() - 1)).format('MMMM'),
           priviousMonth2:moment(d.setMonth(d.getMonth() - 1)).format('MMMM')
       }
       var month1Rev = 0;
       var month2Rev = 0;
       var month3Rev = 0;
     
       productModel.getrev(result=>{
      if (result) {
          const rd = result;
          rd.forEach(r=>{
              if(revDate.priviousMonth==moment(r.month).format('MMMM')){
                 
                month1Rev=month1Rev+r.revenue;
                // month1Rev.push(r.revenue);
              }else if(revDate.priviousMonth1==moment(r.month).format('MMMM')){
                month2Rev=month2Rev+r.revenue;
              }else{
                month3Rev=month3Rev+r.revenue;
              }
          })

          const rev = {
              month1:month1Rev,
              month2:month2Rev,
              month3:month3Rev
          }
          console.log(rev,revDate);
          req.session.revenue=rev;
          req.session.month=revDate;
          
          res.render('admin/revenueChart',{rev:rev,revDate:revDate,loogedName: req.cookies['uname']})
      }
  })
  
 
})

router.get('/printingRepo',(req, res)=>{
    const revenue = req.session.revenue;
    const month = req.session.month;
    // ()=>{
    //     const doc = new jsPDF()
    //     doc.autoTable({
    //         head: [['Months', 'Revenue']],
    //         body: [
    //         [month.priviousMonth, revenue.month1],
    //         [month.priviousMonth1, revenue.month2],
    //         [month.priviousMonth2, revenue.month3],
            
    //         ]
    //     })
        
        
    //     doc.save('table.pdf')
    // }
        
    res.render('admin/rev',{revenue:revenue,month:month,loogedName: req.cookies['uname']})

})

module.exports = router;