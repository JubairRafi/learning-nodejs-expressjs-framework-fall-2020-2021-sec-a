const express           = require("express")
const bodyParser 		= require('body-parser');
const cookieParser 		= require('cookie-parser');
const login				= require('./controllers/login');
const admin				= require('./controllers/admin');
const home				= require('./controllers/home');
const logout			= require('./controllers/logout');

const userModel = require.main.require("./models/userModel")
const customerModel = require.main.require("./models/customerModel")

const app               = express();

const port              = 3000;

//config
app.set('view engine', 'ejs');

//middleware
// app.use(express.static('public/login'))
app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//route
app.use("/login",login)
app.use("/admin",admin)
app.use("/home",home)
app.use("/logout",logout)

app.get("/",(req,res)=>{
    res.redirect("/home")
})


//registraton
app.get("/registration",(req,res)=>{
    res.render("registration/index")
})
app.post("/registration",(req,res)=>{
    const customerInfo = {
        customerName: req.body.customerName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        contact:req.body.contact,
        type: "customer"
    }

    customerModel.insert(customerInfo,status=>{
        if (status) {
            userModel.insertCusToUser(customerInfo,status=>{
                    if (status) {
                        res.redirect("/")
                    }else{
                        res.redirect("/registration")
                    }
                })
        }else{
            res.redirect("/registration")
        }
    })
})

//server
app.listen(port, (e)=>{
    if (!e) {
        console.log("server started at " + port);
    }else{
        console.log(e);
    }
})