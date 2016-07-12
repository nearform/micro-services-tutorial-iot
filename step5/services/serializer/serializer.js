'use strict';

const seneca = require('seneca')();
const influx = require('influx');
const influxUtil = require('./influxUtil');



const createDatabase = (cb) => {
  setTimeout(() => {
    const initDb = influx({host: process.env.PROXY_HOST, username: 'root', password: 'root'});
    initDb.createDatabase('temperature', (err) => {
      if (err) {
        console.error(`ERROR: ${err}`);
      }

      cb();
    });
  }, 3000);
};



createDatabase(() => {
  const db = influx({host: process.env.PROXY_HOST, username: 'root', password: 'root', database: 'temperature'});
  const ifx = influxUtil(db);

  seneca.add({role: 'serialize', cmd: 'read'}, (args, cb) => {
    ifx.readPoints(args.sensorId, args.start, args.end, cb);
  });


  seneca.add({role: 'serialize', cmd: 'write'}, (args, cb) => {
    ifx.writePoint(args.sensorId, args.temperature, cb);
  });


  seneca.listen({port: process.env.serializer_PORT});
});


module.exports.seneca = seneca;
