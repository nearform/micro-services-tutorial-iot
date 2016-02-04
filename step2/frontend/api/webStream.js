'use strict';

var _ = require('lodash');
var websocket = require('websocket-stream');
var eos = require('end-of-stream');



module.exports = function(http) {
  var streamCounter = 0;
  var streams = {};


  var emit = function(data) {
    _.forEach(streams, function (stream) {
      stream.write(JSON.stringify(data), function () {
        console.log('data sent');
      });
    });
  };



  var handleStream = function(stream) {
    stream.id = streamCounter++;
    streams[stream.id] = stream;

    eos(stream, function () {
      delete streams[stream.id];
    });
  };



  websocket.createServer({server: http}, handleStream);

  return {
    emit: emit
  };
};

