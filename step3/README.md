# Step 3

## solution to step 2

1. The influx container can be started with the script provided in step3/services/influx
2. Start the serialization service with the script step3/services/serializer/run.sh
3. Start the frontend with the script step3/frontend/run.sh
4. open the frontend at http://localhost:10001/
5. Send some test data using the script step3/services/serializer/testWrite.sh
6. The data points should appear on the frontend chart

## Challenge
![image](../docs/fuge-logo.png)

Right now we only have 3 moving parts in our system, but already it is becoming a pain to manage. In this step, your challenge is to get the system running using Fuge. Fuge is a micro-service development environment that helps ease the process of local development running processes and docker containers.

The folder step3/fuge contains two files:

* compose-dev.yml - a docker compose format file that specifies the processes that make up our system
* fuge-config.json - global fuge settings

Your challenge is to run the system using the fuge shell. You can find some documentation on fuge here: https://github.com/apparatus/fuge.

__hint__ you will need to stop all of the previously running processes and containers first.

__hint__ make sure that you have installed fuge using `npm install -g fuge`.

__hint__ you can start the fuge shell using `fuge shell ./fuge/compose-dev.yml`


## Next Up [step4](./step4/README.md)
