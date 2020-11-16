
const db = require("./db");

module.exports = {
    insert : function(customerInfo,callback){
        var sql = "insert into customerpi values('','"+customerInfo.customerName+"','"+customerInfo.email+"','"+customerInfo.password+"', '"+customerInfo.address+"',  '"+customerInfo.contact+"')";
			  
		  db.execute(sql, status=>{
				callback(status)
		  })

        },

        update : function(customerInfo,callback){
            var sql = "update customerpi set customerName = '"+customerInfo.customerName+"',email = '"+customerInfo.email+"',password = '"+customerInfo.password+"',address = '"+customerInfo.address+"',contact = '"+customerInfo.contact+"' where id = '"+customerInfo.id+"'";
                  
              db.execute(sql, status=>{
                    callback(status)
              })
    
            },
        getCustomer:function(uname,callback){
			var sql = "select * from customerpi where email='"+uname+"'";
				  
			  db.getResults(sql, results=>{
					if (results.length >0) {
						callback(results)
					}else{
						callback(false)
					}
			  })
	
            },

            getCustomerById:function(id,callback){
                var sql = "select * from customerpi where id='"+id+"'";
                      
                  db.getResults(sql, results=>{
                        if (results.length >0) {
                            callback(results)
                        }else{
                            callback(false)
                        }
                  })
        
                }
      

 }

    

    
