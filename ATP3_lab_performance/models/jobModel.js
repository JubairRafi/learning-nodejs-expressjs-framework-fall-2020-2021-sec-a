const db = require("./db");

module.exports = {
    getAllJobs: function(callback){

        var sql = "select * from job";
	
		db.getResults(sql,results=>{
			callback(results);
		})
    },

    insert: function(job,callback){
         
		  var sql = "insert into job values('','"+job.companyName+"','"+job.jobTitle+"','"+job.location+"', '"+job.salary+"')";
          db.execute(sql,(status)=>{
              
              callback(status)
          })
          
    },


    update: function(id,employerEditedInfo,callback){
      var sql = "update user job employerName = '"+employerEditedInfo.employerName+"',companyName = '"+employerEditedInfo.companyName+"',contact = '"+employerEditedInfo.contact+"',username = '"+employerEditedInfo.username+"',password = '"+employerEditedInfo.password+"' where id='"+id+"'";
        
      db.execute(sql,status=>{
          callback(status)
      })
    },


    delete: function(id,callback){
       var sql = "delete from job where id='"+id+"'";
       db.execute(sql,status=>{
        callback(status)
    })
 }
}