'use strict';

var express = require('express');
var seneca = require('seneca')();
var app = express();
var http = require('http').Server(app);
var webStream = require('./webStream')(http);
var moment = require('moment');
var _ = require('lodash');

seneca.client({host: process.env.PROXY_HOST, port: process.env.SERIALIZER_PORT, pin: {role: 'serialize', cmd: 'read'}});
app.use('/', express.static(__dirname + '/../public'));

var lastEmitted = 0;
setInterval(function() {
  seneca.act({role: 'serialize', cmd: 'read', sensorId: '1', start: moment().subtract(10, 'minutes').utc().format(), end: moment().utc().format()}, function(err, data) {
    var toEmit = [];

    _.each(data[0], function(point) {
      if (moment(point.time).unix() > lastEmitted) {
        lastEmitted = moment(point.time).unix();
        point.time = (new Date(point.time)).getTime();
        toEmit.push(point);
      }
    });
    if (toEmit.length > 0) {
      console.log('will emit');
      console.log(toEmit);
      webStream.emit(toEmit);
    }
    else {
      console.log('.');
    }
  });
}, 1000);



http.listen(process.env.FRONTEND_PORT, function(){
  console.log('listening on *:' + process.env.FRONTEND_PORT);
});
