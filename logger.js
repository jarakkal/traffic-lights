var sqlite3 = require('sqlite3').verbose();

var logger = function(){
    var self = this;
    self.db = new sqlite3.Database('trafficLightChanges.db');
    
    self.db.serialize(function() {
      self.db.run("CREATE TABLE if not exists traffic_lights_info (\n\
                    ID INTEGER PRIMARY KEY,\n\
                    action TEXT,\n\
                    time_stamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
    });
    self.add = function(logMsg){
        var stmt = self.db.prepare("INSERT INTO traffic_lights_info (action) VALUES (?)");
        stmt.run(logMsg);
        stmt.finalize();
        //self.finish();
    }
    self.get = function(data,next){
        var q = "select time_stamp,action from traffic_lights_info WHERE time(time_stamp) \n\
                 BETWEEN '"+data.start+"' AND '"+data.end+"'";
        self.db.all(q, function(err, rows){
            // call your callback with the data
            return next(err, rows);
        });
        self.finish();
    }
    self.finish = function(){
        self.db.close();
    }

}
module.exports = logger;
