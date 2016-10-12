// client-side js
// run by the browser each time your view template is loaded

var socket = io();
var updateLights = function(data){
  var parentDiv = $("#"+data.id+">.trafficlight");
  parentDiv.children("."+data.addCol.replace(/,/g,",.")).css("opacity","1.0");
  parentDiv.children("."+data.remCol.replace(/,/g,",.")).css("opacity","0.2");
}

//client joinging the server
socket.on('connect', function(data) {
  socket.emit('join', 'joining...');
});

socket.on('messages', function(data) {
  if(data.appStat) {
    $("button.initiator").attr("disabled","true");
  }
  //get log times to label the button
  if(data.logTimes) {
      $("button.extractor").html("Get traffic info between "+data.logTimes.start+" and "+data.logTimes.end);
  }
});

//receive traffic light signals
socket.on('broad', function(data) {
  $("button.initiator").attr("disabled","true");
  updateLights(data);
});

//recieve traffic logs
socket.on('logs', function(data) {
    var log = "";
    $.each(data,function(i,v){
        log += v.time_stamp+": "+v.action+"<br/>"; 
    })
    $("#logOutput").html(log);
});

//initiate traffic control and broadcast to all clients
$("button.initiator").click(function(){
  var thisBtn = $(this);
  socket.emit('start',{"id":thisBtn.attr("initFrom")});
});

//request for logs
$("button.extractor").click(function(){
    var thisBtn = $(this);
    socket.emit('extract',{});
});
