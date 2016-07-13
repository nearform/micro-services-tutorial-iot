set SERIALIZER_PORT=10000
docker-machine ip default > dock
set /p PROXY_HOST= < dock
del dock
node serializer.js
