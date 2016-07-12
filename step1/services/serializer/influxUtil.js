'use strict';

module.exports = function (client) {

  const writePoint = (sensorId, temperature, cb) => {
    client.writePoint('temperature', {sensorId: sensorId, temperature: temperature}, {}, cb);
  };



  const readPoints = (sensorId, start, end, cb) => {
    const query = `select * from temperature where sensorId='${sensorId}' and time > '${start}' and time < '${end}'`;
    client.query(query, cb);
  };



  return {
    writePoint,
    readPoints
  };
};
