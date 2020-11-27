
const db = require("./db");

module.exports = {


    getAllMedicine : function(callback){
			var sql = "select * from medicine";
				  
			  db.getResults(sql, results=>{
					if (results.length >0) {
						callback(results)
					}else{
						callback(false)
					}
			  })
	
            },
            
     deleteMedicine : function(id,callback){
        var sql = "DELETE FROM medicine WHERE medicine_id = '"+id+"'";
              
                db.execute(sql, status=>{
                    callback(status)
            })

        },

        addMedicine : function(medInfo,callback){
            var sql = "insert into medicine values('','"+medInfo.name+"', '"+medInfo.price+"', '"+medInfo.quantity+"', '"+null+"','"+medInfo.catagory+"', '"+medInfo.vendorname+"')";
            console.log(sql);
				  
			db.execute(sql, status=>{
				callback(status)
		  })
	
		},

		getMedicine:function(id,callback){
			var sql = "select * from medicine where medicine_id='"+id+"'";
				  console.log(sql);
			  db.getResults(sql, results=>{
					if (results.length >0) {
						callback(results)
					}else{
						callback(false)
					}
			  })
	
			},
			editMedicine :function(med,callback){
				var sql = "update medicine set mName = '"+med.name+"',price = '"+med.price+"',quantity = '"+med.quantity+"' where medicine_id = '"+med.id+"'";
					  
				db.execute(sql, status=>{
					callback(status)
			  })
		
			}
   

 }

    

    
