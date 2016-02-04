'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var webStream = require('./webStream')(http);
var i = 0;

app.use('/', express.static(__dirname + '/../public'));



setInterval(function() {
  var randInt = Math.floor(Math.random() * 100);
  var temp = Math.round((Math.sin(i++ / 40) + 4) * (randInt + 200));
  webStream.emit([{time: (new Date()).getTime(), sensorId: '1', temperature: temp}]);
}, 1000);



http.listen(10001, function(){
  console.log('listening on *:10001');
});

