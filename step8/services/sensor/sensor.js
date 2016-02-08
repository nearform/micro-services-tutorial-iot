'use strict';

var mqtt = require('mqtt').connect('mqtt://' + process.env.PROXY_HOST + ':1883');
var offset = 100;



mqtt.on('connect', function () {
  mqtt.subscribe('temperature/1/set', function () {
    console.log('subscribed', arguments);
  });
});



mqtt.on('message', function (topic, payload) {
  console.log('message received');
  try {
    offset = JSON.parse(payload).offset;
    console.log('new offset', offset);
  } 
  catch (err) {
    console.log(err);
    return;
  }
});



var i = 0;
setInterval(function() {
  var randInt = Math.floor(Math.random()*100);
  var temp = Math.round((Math.sin(i++ / 40) + 4) * randInt + offset);

  mqtt.publish('temperature/1/read', JSON.stringify({sensorId: '1', temperature: temp}), function(err) {
    if (err) { console.log(err); }
  });
}, 2000);

