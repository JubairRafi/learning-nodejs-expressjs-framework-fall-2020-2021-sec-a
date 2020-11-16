const express           = require("express")
const bodyParser 		= require('body-parser');
const cookieParser 		= require('cookie-parser');
const login				= require('./controllers/login');
const admin				= require('./controllers/admin');
const logout				= require('./controllers/logout');
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
app.use("/logout",logout)

app.get("/",(req,res)=>{
    res.send("HOME");
})

//server
app.listen(port, (e)=>{
    if (!e) {
        console.log("server started at " + port);
    }else{
        console.log(e);
    }
})