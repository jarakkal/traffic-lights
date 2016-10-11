var socketio = require('socket.io');
var lights = require('./lights.js');
var config = require('./config.js');
var logger = require('./logger.js');

var appStat = 0;
var socket = function(listener) {
    var io = socketio(listener,{cookie:false});
    var self = this;
    self.lightID = 1;
    self.light = new lights();
    //tell client of the changes
    self.informClient = function(params){
        self.client_obj.emit('broad',params);
        self.client_obj.broadcast.emit('broad',params);
    }
    //waterfall chaining of traffic light change
    self.startChange = function(lightID){
        self.informClient({id:lightID,addCol:"red,yellow",remCol:"green"});
        self.light.setGreen(lightID,config.traffic.lightsTimer.yellow,function(){
           self.informClient({id:lightID,addCol:"green",remCol:"red,yellow"});
           setTimeout(function(){
              self.informClient({id:lightID,addCol:"green,yellow",remCol:"red"});
              self.light.setRed(lightID,config.traffic.lightsTimer.yellow,function(){
                  self.informClient({id:lightID,addCol:"red",remCol:"green,yellow"});
              }); 
           },config.traffic.lightsTimer.green); 
        });
    }
    io.on('connection', function(client) {
      console.log('Client connected...');
      client.on('join', function(data) {
        client.emit('messages', {"appStat":appStat,"logTimes":config.traffic.timeToLog});
      });
      //start the uninterrupted traffic lights flow
      client.on('start', function(data) {
          self.client_obj = client;
          self.startChange(self.lightID );
          self.lightID++;
          setInterval(function(){
             self.startChange(self.lightID);
             self.lightID = (self.lightID === config.traffic.lights.length) ? 1 : self.lightID+1;
          },((+config.traffic.lightsTimer.yellow*2)+config.traffic.lightsTimer.green));
      });
      //output logs to client screen
      client.on('extract',function(data){
         var logs = new logger();
         var query_date = config.traffic.timeToLog;
         logs.get(query_date,function(err,rows){
             console.log(err);
             client.emit('logs',rows);
         });
      });
  });
  return io;
}
module.exports = socket;
