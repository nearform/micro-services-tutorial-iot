#!/bin/bash
export DOCKER_IP=$(docker-machine ip default)
curl -X POST -d "{\"role\": \"serialize\", \"cmd\": \"write\", \"sensorId\": \"1\", \"temperature\": 32}" http://$DOCKER_IP:3001/act  --header "Content-Type:application/json"

