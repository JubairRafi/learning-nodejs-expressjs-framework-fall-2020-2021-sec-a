
const db = require("./db");

module.exports = {
    insert : function(customerInfo,callback){
        var sql = "insert into customerpi values('','"+customerInfo.customerName+"','"+customerInfo.email+"','"+customerInfo.password+"', '"+customerInfo.address+"',  '"+customerInfo.contact+"')";
			  
		  db.execute(sql, status=>{
				callback(status)
		  })

        }
      

 }

    

    
