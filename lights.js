var logger = require('./logger.js'); 
var config = require('./config.js');

var lights = function(){
    var self = this;
    var logs = new logger();
    //general settimeout
    self.updateLights = function(params,seconds,next){
        setTimeout(function(){
            if(seconds > 0){
                var logMsg = config.traffic.lights[+params.id-1].title+" traffic light updated to "+params.addCol;
                self.log(logMsg);
            }
            return next(params);
        },seconds);
    }
    //change to yellow then green
    self.setGreen = function(lightID,update_after,next){
        appStat = {id:lightID,addCol:'red,yellow',remCol:'green'};
        self.updateLights(appStat,0,function(){
            appStat = {id:lightID,addCol:'green',remCol:'red,yellow'};
            self.updateLights(appStat,update_after,function(){
                console.log("light id green "+lightID);
                var logMsg = "Going to update "+config.traffic.lights[lightID-1].title+" traffic light to "+appStat.addCol;
                self.log(logMsg);
                return next(appStat);
            });
        });
    }
    //change to yellow then red
    self.setRed = function(lightID,update_after,next){
        appStat = {id:lightID,addCol:'green,yellow',remCol:'red'};
        self.updateLights(appStat,0,function(){
            appStat = {id:lightID,addCol:'red',remCol:'green,yellow'};
            self.updateLights(appStat,update_after,function(err){
                var logMsg = "Going to update "+config.traffic.lights[lightID-1].title+" traffic light to "+appStat.addCol;
                self.log(logMsg);
                return next(appStat);  
            });
        });
    }
    //add record to sqlite
    self.log = function(logMsg){
        logs.add(logMsg);
        console.log(logMsg);
        return true;
    }
}

module.exports = lights;
