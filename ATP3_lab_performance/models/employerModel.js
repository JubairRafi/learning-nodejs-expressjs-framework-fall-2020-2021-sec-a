
const db = require("./db");

module.exports = {
    validate : function(employer,callback){
        var sql = "select * from user where username='"+employer.username+"' and password='"+employer.password+"'";
			  
		  db.getResults(sql, results=>{
				if (results.length >0) {
					callback(true)
				}else{
					callback(false)
				}
		  })

        },
    getAllEmployer: function(callback){

        var sql = "select * from user";
	
		db.getResults(sql,results=>{
			callback(results);
		})
    },

    insert: function(employer,callback){
         
		  var sql = "insert into user values('','"+employer.employerName+"','"+employer.companyName+"','"+employer.contactNo+"', '"+employer.username+"',  '"+employer.password+"')";
          db.execute(sql,(status)=>{
              
              callback(status)
          })
          
    },

    getByID : function(id,callback){
        var sql = "select * from user where id='"+id+"'";
        db.getResults(sql,results=>{
            callback(results)
        })
    },

    update: function(id,employerEditedInfo,callback){
      var sql = "update user set employerName = '"+employerEditedInfo.employerName+"',companyName = '"+employerEditedInfo.companyName+"',contact = '"+employerEditedInfo.contact+"',username = '"+employerEditedInfo.username+"',password = '"+employerEditedInfo.password+"' where id='"+id+"'";
        
      db.execute(sql,status=>{
          callback(status)
      })
    },


    delete: function(id,callback){
       var sql = "delete from user where id='"+id+"'";
       db.execute(sql,status=>{
        callback(status)
    })
 }

    

    
}