// server.js
// init project
var express = require('express');
var nunjucks = require('nunjucks');
var config = require('./config.js');
var lights = require('./lights.js');
var logger = require('./logger.js'); 
var bodyParser = require('body-parser');
var app = express();

//bind nunjucks to views
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

var socket = require('./socket.js');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.render('index.html', {allLights:config.traffic.lights});
});


// listen for requests :)
var listener = app.listen(3333);

//allow socket to travel on server
var io = new socket(listener);

var appStat = 0;
