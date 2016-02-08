'use strict';

const Mqtt = require('mqtt');
const Seneca = require('seneca');

const mqtt = require('mqtt').connect('mqtt://' + process.env.PROXY_HOST + ':1883');
const seneca = Seneca();



seneca.add({role: 'actuate', cmd: 'set'}, (args, cb) => {
  const payload = JSON.stringify({'offset':  parseInt(args.offset, 10) });
  mqtt.publish('temperature/1/set', new Buffer(payload), {qos: 0, retain: true}, cb);
});

seneca.listen({port: process.env.actuator_PORT});
