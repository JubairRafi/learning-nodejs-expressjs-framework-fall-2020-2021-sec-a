const express = require("express")
const app = express();
const port = 3000;

app.listen(port, (e)=>{
    if (!e) {
        console.log("server started at " + port);
    }else{
        console.log(e);
    }
})