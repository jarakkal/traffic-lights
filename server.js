// server.js
// where your node app starts

// init project
var express = require('express');
var nunjucks = require('nunjucks');
var config = require('./config.js');
var lights = require('./lights.js');
var logger = require('./logger.js'); 
var bodyParser = require('body-parser');
var app = express();
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

var socket = require('./socket.js');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

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
var io = new socket(listener);
var appStat = 0;
