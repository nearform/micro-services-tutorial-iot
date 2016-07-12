'use strict';

process.env.SERVICE_HOST = 'localhost';
process.env.SERVICE_PORT = 3001;
process.env.INFLUX_HOST = '192.168.59.103';

const assert = require('assert');
const ser = require('../serializer');

describe('read write test', () => {
  it('should write data to influx', (done) => {
    ser.seneca.act({role: 'serialize', cmd: 'write', sensorId: '1', temperature: 32}, (err) => {
      assert(!err);
      done();
    });
  });
});
