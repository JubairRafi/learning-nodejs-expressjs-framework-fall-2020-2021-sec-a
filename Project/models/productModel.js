
const db = require("./db");

module.exports = {
    getProduct : function(callback){
        var sql = "select * from product";
			  
		  db.getResults(sql, results=>{
				if (results.length >0) {
					callback(results)
				}else{
					callback(false)
				}
		  })

        },
        getProductOwnerS : function(product,callback){
            var sql = "select * from sellerpi where user_id='"+product.user_id+"'";  
            console.log(sql);      
              db.getResults(sql, results=>{
                console.log("back from seller");  
                    if (results.length >0) {
                        callback(results)
                    }else{
                        callback(false)
                    }
              })
            },
            getProductOwnerR : function(product,callback){
                var sql = "select * from retailsellerpi where user_id = '"+product.user_id+"'";
                console.log(sql);
                   
                  db.getResults(sql, results=>{
                    console.log("back from retailseller");
                        if (results.length >0) {
                            callback(results)
                        }else{
                            callback(false)
                        }
                  })
                },

            getCatagory :function(product,callback){
                var sql = "select * from catagory where catagory_id = '"+product.catagory_id+"'";
                console.log(sql);
                   
                  db.getResults(sql, results=>{
                    console.log("back from retailseller");
                        if (results.length >0) {
                            callback(results)
                        }else{
                            callback(false)
                        }
                  })
                }
        
 }

    

    
