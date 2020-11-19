
const db = require("./db");

module.exports = {
    getAdmin : function(callback){
        var sql = "select * from adminpi";
			  
		  db.getResults(sql, results=>{
				if (results.length >0) {
					callback(results)
				}else{
					callback(false)
				}
		  })

		},
		updateAdmin: function(user,id,callback){
			var sql = "update adminpi set name = '"+user.name+"',email = '"+user.email+"',password = '"+user.password+"',profile_pic = '"+user.pp+"',phone_no = '"+user.contact+"' where admin_id = '"+id+"'";
			db.execute(sql, status=>{
				callback(status)
		  })
	
		}
		
		

   

 }

    

    
