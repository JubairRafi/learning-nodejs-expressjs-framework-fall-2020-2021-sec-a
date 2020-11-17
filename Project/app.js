const express           = require("express");
const cookieParser 		= require('cookie-parser');
const bodyParser        = require("body-parser");

//controllers

const admin = require("./controllers/admin")


const app = express();
const port = 3000;

//config
app.set('view engine', 'ejs');

//middleware
app.use('/public', express.static('public'));


app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//route
app.use("/admin",admin);

app.get("/",(req,res)=>{
    res.send("HOME");
})



app.listen(3000,(err)=>{
    if (!err) {
        console.log("server started at "+port);
    }
})