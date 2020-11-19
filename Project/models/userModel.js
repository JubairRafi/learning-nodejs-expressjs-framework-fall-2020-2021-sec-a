
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

		}
		
		

   

 }

    

    
