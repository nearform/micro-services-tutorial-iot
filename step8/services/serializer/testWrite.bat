docker-machine ip default > dock
set /p DOCKER_IP= < dock
del dock
curl -X POST -d "{\"role\": \"serialize\", \"cmd\": \"write\", \"sensorId\": \"1\", \"temperature\": 32}" --header "Content-Type:application/json" http://%DOCKER_IP%:10000/act
