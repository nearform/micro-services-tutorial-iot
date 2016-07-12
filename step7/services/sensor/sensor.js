'use strict';

const mqtt = require('mqtt').connect('mqtt://' + process.env.PROXY_HOST + ':1883');
const offset = 100;



mqtt.on('connect', () => {
  mqtt.subscribe('temperature/1/set', function () {
    console.log('subscribed', arguments);
  });
});



mqtt.on('message', (topic, payload) => {
  console.log('message received');
  try {
    offset = JSON.parse(payload).offset;
    console.log('new offset', offset);
  }
  catch (err) {
    console.log(err);
  }
});



let i = 0;
setInterval(() => {
  const randInt = Math.floor(Math.random()*100);
  const temp = Math.round((Math.sin(i++ / 40) + 4) * randInt + offset);

  mqtt.publish('temperature/1/read', JSON.stringify({sensorId: '1', temperature: temp}), function(err) {
    if (err) { console.log(err); }
  });
}, 2000);
