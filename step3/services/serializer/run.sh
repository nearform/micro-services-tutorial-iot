#!/bin/bash
export serializer_PORT=10000
export PROXY_HOST=$(docker-machine ip default)
node serializer.js
