#!/bin/bash
# when the api console launches, run startup-dev.sh to start the rails app
# you will be able to interact with the debugger at this point

docker-compose up -d api
sleep 5
docker-compose run --service-ports app sh
