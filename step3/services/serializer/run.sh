#!/bin/bash
export SERVICE_HOST=127.0.0.1
export SERVICE_PORT=10001
export PROXY_HOST=$(docker-machine ip default)
node serializer.js
