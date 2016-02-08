'use strict';

const Seneca = require('seneca');
const influx = require('influx');
const influxUtil = require('./influxUtil');

const seneca = Seneca();


var createDatabase = function (cb) {
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
  var db = influx({host: process.env.PROXY_HOST, username: 'root', password: 'root', database: 'temperature'});
  var ifx = influxUtil(db);

  seneca.add({role: 'serialize', cmd: 'read'}, (args, cb) => {
    ifx.readPoints(args.sensorId, args.start, args.end, cb);
  });


  seneca.add({role: 'serialize', cmd: 'write'}, (args, cb) => {
    ifx.writePoint(args.sensorId, args.temperature, cb);
  });


  seneca.listen({port: process.env.serializer_PORT});
});


module.exports.seneca = seneca;
