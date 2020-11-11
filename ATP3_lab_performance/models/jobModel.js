const db = require("./db");

module.exports = {
    getAllJobs: function(callback){

        var sql = "select * from job";
	
		db.getResults(sql,results=>{
			callback(results);
		})
    },

    getById : function(id,callback){
        var sql = "select * from job where id='"+id+"'";
        db.getResults(sql,results=>{
            callback(results)
        })
    },

    insert: function(job,callback){
         
		  var sql = "insert into job values('','"+job.companyName+"','"+job.jobTitle+"','"+job.location+"', '"+job.salary+"')";
          db.execute(sql,(status)=>{
              
              callback(status)
          })
          
    },


    update: function(id,job,callback){
      var sql = "update job set companyName = '"+job.companyName+"',jobTitle = '"+job.jobTitle+"',location = '"+job.location+"',salary = '"+job.salary+"' where id='"+id+"'";
        
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