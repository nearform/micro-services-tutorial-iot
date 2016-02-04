'use strict';

var graph;
var websocket = require('websocket-stream');



var initChart = function() {
  graph = new Rickshaw.Graph( {
    element: document.getElementById('chart'),
    width: 700,
    height: 300,
    renderer: 'line',
    stroke: true,
    series: [{
      data: [],
      color: '#6060c0',
      name: 'sensor1'
    }]
  });
  graph.render();

  var hoverDetail = new Rickshaw.Graph.HoverDetail({
    graph: graph,
    xFormatter: function(x) {
      return new Date(x * 1000).toString();
    }
  });

  var annotator = new Rickshaw.Graph.Annotate({
    graph: graph,
    element: document.getElementById('timeline')
  });

  var ticksTreatment = 'glow';

  var xAxis = new Rickshaw.Graph.Axis.Time({
    graph: graph,
    ticksTreatment: ticksTreatment,
    timeFixture: new Rickshaw.Fixtures.Time.Local()
  });
  xAxis.render();

  var yAxis = new Rickshaw.Graph.Axis.Y({
    graph: graph,
    tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
    ticksTreatment: ticksTreatment
  });
  yAxis.render();

  var start = (new Date().getTime() / 1000) - 50;
  for (var idx = 0; idx <= 50; ++idx) {
    graph.series[0].data.push({x: start + idx, y: 0});
  }
  graph.render();

  var stream = websocket(document.URL.replace('http', 'ws'));
  stream.on('data', function(data) {
    updateChart(graph, JSON.parse(data));
  });
};



var updateChart = function(graph, data) {
  if (graph.series[0].data.length + data.length > 50) {
    graph.series[0].data = _.drop(graph.series[0].data, graph.series[0].data.length + data.length - 50);
  }
  data.forEach(function(point) {
    if (point.sensorId === '1') {
      graph.series[0].data.push({x: Math.round(point.time/1000), y: point.temperature});
    }
  });
  graph.render();
};



$(document).ready(function() {
  initChart();
});

