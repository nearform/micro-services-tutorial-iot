set SERIALIZER_PORT=10000
docker-machine ip default > dock
set /p INFLUX_HOST= < dock
del dock
node serializer.js
