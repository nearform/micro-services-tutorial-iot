#!/bin/bash
export serializer_PORT=10000
export INFLUX_HOST=$(docker-machine ip default)
node serializer.js
