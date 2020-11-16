
const db = require("./db");

module.exports = {
    insert : function(adminInfo,callback){
        var sql = "insert into adminpi values('','"+adminInfo.firstName+"','"+adminInfo.lastName+"','"+adminInfo.email+"', '"+adminInfo.password+"',  '"+adminInfo.contact+"')";
			  
		  db.execute(sql, status=>{
				callback(status)
		  })

        }
      

 }

    

    
