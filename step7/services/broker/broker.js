'use strict';

const mosca = require('mosca');
const seneca = require('seneca')();
const server = new mosca.Server({});


seneca.client({host: process.env.PROXY_HOST, port: process.env.SERIALIZER_PORT, pin: {role: 'serialize', cmd: 'write'}});



function parse (body) {
  try {
    return JSON.parse(body);
  }
  catch (err) {
    return null;
  }
}



server.published = function (packet, client, cb) {
  let body;
  if (packet.topic.match(/temperature\/[0-9]+\/read/)) {
    body = parse(packet.payload);

    body.role = 'serialize';
    body.cmd = 'write';
    seneca.act(body, cb);
  }
  else {
    cb();
  }
};
