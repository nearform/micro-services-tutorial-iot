set serializer_PORT=10000
docker-machine ip default > dock
set /p PROXY_HOST= < dock
rm dock
node serializer.js
