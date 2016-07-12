'use strict';

module.exports = function(client) {

  const writePoint = (sensorId, temperature, cb) => {
    client.writePoint('temperature', {sensorId: sensorId, temperature: temperature}, {}, function(err) {
      cb(err);
    });
  };



  const readPoints = (sensorId, start, end, cb) => {
    client.query('select * from temperature where sensorId=\'' + sensorId + '\' and time > \'' + start + '\' and time < \'' + end + '\'', function(err, data) {
      cb(err, data);
    });
  };



  return {
    writePoint: writePoint,
    readPoints: readPoints
  };
};
