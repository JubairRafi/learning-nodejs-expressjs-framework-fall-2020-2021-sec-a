
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
	
		},
		getCustomer : function(callback){
			var sql = "select * from customerpi";
			console.log(sql);
			   
			  db.getResults(sql, results=>{
					if (results.length >0) {
						callback(results)
					}else{
						callback(false)
					}
			  })
			},
		getCustomerByID:function(cid,callback){
			var sql = "select * from customerpi where customer_id='"+cid+"'";
			console.log(sql);
			   
			  db.getResults(sql, results=>{
					if (results.length >0) {
						callback(results)
					}else{
						callback(false)
					}
			  })
			},
		banCustomer:function(cid,callback){
			var sql = "update customerpi set block_status='"+1+"' where customer_id='"+cid+"'";
			console.log(sql);
		
			  db.execute(sql, results=>{
					
						callback(results)
					
			  })
			},
		unbanCustomer:function(cid,callback){
			var sql = "update customerpi set block_status='"+0+"' where customer_id='"+cid+"'";
			console.log(sql);
		
			  db.execute(sql, results=>{
					
						callback(results)
					
			  })
			}
	

 }

    

    
