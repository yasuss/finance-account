## Deploy applications

## Pre-installation

Requires docker and docker-compose to be installed

### Command to install docker:

npm install -g docker

### Command to install docker-compose:

npm install -g docker-compose

### Command to start docker:

systemctl start docker

### Deploying the application:

To build the application image (server and client parts), run the command in the root folder of the project

docker build -t finance-account .

To raise the application image and postgres, run the command in the project root folder

docker-compose up -d 

## Stop containers:

docker-compose down

## Deleting images:

docker image prune
