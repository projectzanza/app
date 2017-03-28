#!/bin/bash
# when the api console launches, run startup-dev.sh to start the rails app
# use start-debug.sh to run the debugging instance from RubyMine

docker-compose up -d db mail_server
docker-compose stop api
sleep 5
docker-compose run --service-ports api sh
