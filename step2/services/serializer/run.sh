#!/bin/bash
export SERVICE_HOST=127.0.0.1
export SERVICE_PORT=10000
export INFLUX_HOST=$(docker-machine ip default)
node serializer.js
