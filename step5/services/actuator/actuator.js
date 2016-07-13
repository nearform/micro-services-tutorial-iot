'use strict';

const seneca = require('seneca')();
const mqtt = require('mqtt').connect('mqtt://' + process.env.PROXY_HOST + ':1883');



seneca.add({role: 'actuate', cmd: 'set'}, (args, cb) => {
  const payload = JSON.stringify({'offset':  parseInt(args.offset, 10) });
  mqtt.publish('temperature/1/set', new Buffer(payload), {qos: 0, retain: true}, cb);
});

seneca.listen({port: process.env.ACTUATOR_PORT});
