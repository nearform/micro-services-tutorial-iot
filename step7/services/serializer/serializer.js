'use strict';

const seneca = require('seneca')();
const influx= require('influx');



const createDatabase = (cb) => {
  setTimeout(() => {
    const initDb = influx({host: process.env.PROXY_HOST, username : 'root', password : 'root'});
    initDb.createDatabase('temperature', (err) => {
      if (err) {
        console.log('ERROR: ' + err);
      }

      cb();
    });
  }, 3000);
};



createDatabase(() => {
  const db = influx({host: process.env.PROXY_HOST, username : 'root', password : 'root', database : 'temperature'});
  const ifx = require('./influxUtil')(db);

  seneca.add({role: 'serialize', cmd: 'read'}, (args, callback) => {
    ifx.readPoints(args.sensorId, args.start, args.end, (err, data) => {
      callback(err, data);
    });
  });


  seneca.add({role: 'serialize', cmd: 'write'}, (args, callback) => {
    ifx.writePoint(args.sensorId, args.temperature, (err) => {
      callback(err);
    });
  });


  seneca.listen({port: process.env.SERIALIZER_PORT});
});


module.exports.seneca = seneca;
