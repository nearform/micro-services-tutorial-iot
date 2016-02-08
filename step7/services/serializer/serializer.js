'use strict';

var seneca = require('seneca')();
var influx= require('influx');



var createDatabase = function(cb) {
  setTimeout(function() {
    var initDb = influx({host: process.env.PROXY_HOST, username : 'root', password : 'root'});
    initDb.createDatabase('temperature', function(err) {
      if (err) { console.log('ERROR: ' + err); }
      cb();
    });
  }, 3000);
};



createDatabase(function() {
  var db = influx({host: process.env.PROXY_HOST, username : 'root', password : 'root', database : 'temperature'});
  var ifx = require('./influxUtil')(db);

  seneca.add({role: 'serialize', cmd: 'read'}, function(args, callback) {
    ifx.readPoints(args.sensorId, args.start, args.end, function(err, data) {
      callback(err, data);
    });
  });


  seneca.add({role: 'serialize', cmd: 'write'}, function(args, callback) {
    ifx.writePoint(args.sensorId, args.temperature, function(err) {
      callback(err);
    });
  });


  seneca.listen({port: process.env.serializer_PORT});
});


module.exports.seneca = seneca;


