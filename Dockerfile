﻿# pull official base image
FROM node:20.10

COPY . /app/

WORKDIR /app/client
ENV PATH /app/client/node_modules/.bin:$PATH
COPY package*.json ./client/
RUN npm install --no-package-lock --legacy-peer-deps

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
COPY ./db/migrations /app/migrations

RUN npm --unsafe-perm install
RUN npm install --silent
RUN npm install nodemon -g --save
RUN npm install -g react-scripts
RUN npm install react-scripts@2.1.8 -g --silent

# add app
COPY . .

EXPOSE 8080

# start app
CMD ["npm", "run", "start"]