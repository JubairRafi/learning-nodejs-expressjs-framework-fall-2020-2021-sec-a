
const db = require("./db");

module.exports = {
    validate : function(user,callback){
        var sql = "select * from user where email='"+user.username+"' and password='"+user.password+"'";
			  
		  db.getResults(sql, results=>{
				if (results.length >0) {
					callback(results)
				}else{
					callback(false)
				}
		  })

		},
		updateAdmin: function(user,uid,callback){
			var sql = "update user set email='"+user.email+"',password ='"+user.password+"' where user_id='"+uid+"'";
			db.execute(sql, status=>{
				callback(status)
		  })
	
		}
		
		

   

 }

    

    
