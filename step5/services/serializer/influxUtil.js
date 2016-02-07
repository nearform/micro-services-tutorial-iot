'use strict';

module.exports = function (client) {

  const writePoint = function (sensorId, temperature, cb) {
    client.writePoint('temperature', {sensorId: sensorId, temperature: temperature}, {}, cb);
  };



  const readPoints = function (sensorId, start, end, cb) {
    const query = `select * from temperature where sensorId='${sensorId}' and time > '${start}' and time < '${end}'`;
    client.query(query, cb);
  };



  return {
    writePoint,
    readPoints
  };
};
