
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

        }
   

 }

    

    
