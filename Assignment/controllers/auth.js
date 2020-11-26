const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    
    
    if(req.cookies['token']) {
      
      console.log(req.cookies['token']);
        next()
    }else{
        res.sendStatus(403)
    }
}

module.exports = verifyToken;