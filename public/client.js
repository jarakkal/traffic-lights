// client-side js
// run by the browser each time your view template is loaded

// add other scripts at the bottom of index.html
var socket = io();
var updateLights = function(data){
    console.log(data);
  var parentDiv = $("#"+data.id+">.trafficlight");
  parentDiv.children("."+data.addCol.replace(/,/g,",.")).css("opacity","1.0");
  parentDiv.children("."+data.remCol.replace(/,/g,",.")).css("opacity","0.2");
}

socket.on('connect', function(data) {
  socket.emit('join', 'joining...');
});
socket.on('messages', function(data) {
  console.log(data);
  if(data.appStat) {
    $("button.initiator").attr("disabled","true");
  }
  if(data.logTimes) {
      $("button.extractor").html("Get traffic info between "+data.logTimes.start+" and "+data.logTimes.end);
  }
});
socket.on('broad', function(data) {
  $("button.initiator").attr("disabled","true");
  updateLights(data);
});
socket.on('logs', function(data) {
    var log = "";
    $.each(data,function(i,v){
        log += v.time_stamp+": "+v.action+"<br/>"; 
    })
    $("#logOutput").html(log);
});
$("button.initiator").click(function(){
  console.log("clicked");
  var thisBtn = $(this);
  socket.emit('start',{"id":thisBtn.attr("initFrom")});
});
$("button.extractor").click(function(){
    var thisBtn = $(this);
    socket.emit('extract',{});
});

