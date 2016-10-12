var sqlite3 = require('sqlite3').verbose();

var logger = function(){
    var self = this;
    
    //constructor functions
    self.db = new sqlite3.Database('trafficLightChanges.db');
    self.db.run("CREATE TABLE if not exists traffic_lights_info (\n\
                 ID INTEGER PRIMARY KEY,action TEXT,\n\
                 time_stamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
    
    //add a record
    self.add = function(logMsg,next){
        self.db.run("INSERT INTO traffic_lights_info (action) VALUES ($logMsg)",{$logMsg:logMsg},function(err){
            return next(err,this.lastID);
        });
    }
    
    //get rows based on timeframe
    self.get = function(data,next){
        var q = "select time_stamp,action from traffic_lights_info WHERE time(time_stamp) \n\
                 BETWEEN '"+data.start+"' AND '"+data.end+"'";
        self.db.all(q, function(err, rows){
            // call your callback with the data
            self.finish();
            return next(err, rows);
        });
    }
    
    //delete from logs. Eg test msgs
    self.delete = function(rowId,next){
        self.db.run("delete from traffic_lights_info where id = $id",{$id:rowId},function(err){
            return next(err,true);
        });
    }
    
    //close connection
    self.finish = function(){
        self.db.close();
    }

}
module.exports = logger;
