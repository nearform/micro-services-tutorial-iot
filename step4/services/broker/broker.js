'use strict';

const mosca = require('mosca');
const Seneca = require('seneca');
const server = new mosca.Server({});

const seneca = Seneca();


seneca.client({host: process.env.PROXY_HOST, port: process.env.serializer_PORT, pin: {role: 'serialize', cmd: 'write'}});



function parse (body) {
  try {
    return JSON.parse(body);
  }
  catch (err) {
    return null;
  }
}



server.published = function (packet, client, cb) {
  var body;
  if (!packet.topic.match(/temperature\/[0-9]+\/read/)) {
    return cb();
  }

  body = parse(packet.payload);

  body.role = 'serialize';
  body.cmd = 'write';
  seneca.act(body, cb);
};
