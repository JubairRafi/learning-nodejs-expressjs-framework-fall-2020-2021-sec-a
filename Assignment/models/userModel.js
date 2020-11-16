
const db = require("./db");

module.exports = {
    validate : function(user,callback){
        var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
			  
		  db.getResults(sql, results=>{
				if (results.length >0) {
					callback(results)
				}else{
					callback(false)
				}
		  })

		},
		
		insert : function(adminInfo,callback){
			var sql = "insert into user values('','"+adminInfo.email+"', '"+adminInfo.password+"', '"+adminInfo.type+"')";
				  
			db.execute(sql, status=>{
				callback(status)
		  })
	
		},

		insertCusToUser :function(customerInfo,callback){
			var sql = "insert into user values('','"+customerInfo.email+"', '"+customerInfo.password+"', '"+customerInfo.type+"')";
				  
			db.execute(sql, status=>{
				callback(status)
		  })
	
		}
   

 }

    

    
