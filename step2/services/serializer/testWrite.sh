#!/bin/bash
curl -X POST -d "{\"role\": \"serialize\", \"cmd\": \"write\", \"sensorId\": \"1\", \"temperature\": $RANDOM}" http://localhost:10000/act  --header "Content-Type:application/json"

