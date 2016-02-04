# Step 6

## solution to step 5 

1. the folder step6/fuge contains an updated fuge configuration
2. start fuge up by running `fuge shell fuge/compose-dev.yml`
3. start the system in the shell by running `start all`
4. open http://localhost:10001 to view the data points
5. data is now streaming from the sensor through the broker to the serialization service and being displayed on the front end
6. type a numeric value (say 1000) into the text box at the top of the screen and hit the button
7. The chart should change to reflect the new offset


## Challenge

edit fuge config to not tail, tail the actuator, edit the service to add some trace hit the button and see the new trace come out

## Next Up [step7](./step7/README.md)
