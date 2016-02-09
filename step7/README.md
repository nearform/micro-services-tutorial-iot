# Step 7

## solution to step 6

1. The file step7/fuge/fuge-config.js has been updated to set tail to false
2. The file step7/services/serializer/serializer.js has some additional trace added to it
2. The file step7/frontend/api/index.js has some additional trace added to it

## Challenge

Fuge is targeted at running an entire or part of a microservice system in
development mode. However the format used is fully compatible with  tools like
docker-compose. Docker compose allows you to run sets of connected containers.
Running containers in development can be slow, however if you are deploying
using containers then building containers locally in order to check system
validity is a good idea.

A docker-compose file has been provided for you in step7/fuge/docker-compose.yml. Your challenge is to firstly run your system with fuge using this
docker-compose file. Once you have validated this try running it using docker-compose. You can find documentation on docker-compose here: [https://docs.docker.com/compose/](https://docs.docker.com/compose/)

## Next Up [step8](../step8/README.md)
