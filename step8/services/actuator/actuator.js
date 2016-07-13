'use strict';

const mqtt = require('mqtt').connect('mqtt://' + process.env.PROXY_HOST + ':1883');
const seneca = require('seneca')();



seneca.add({role: 'actuate', cmd: 'set'}, (args, cb) => {
  const payload = JSON.stringify({'offset':  parseInt(args.offset, 10) });
  mqtt.publish('temperature/1/set', new Buffer(payload), {qos: 0, retain: true}, (err) => {
    cb(err);
  });
});

seneca.listen({port: process.env.ACTUATOR_PORT});
