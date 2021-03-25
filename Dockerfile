# pull official base image
FROM launcher.gcr.io/google/nodejs

COPY . /app/

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
# COPY package-lock.json /app/package-lock.json
RUN npm --unsafe-perm install
RUN npm install --silent
RUN npm install nodemon -g --save
RUN npm install -g react-scripts
RUN npm install react-scripts@2.1.8 -g --silent

# add app
COPY . .

# start app
CMD ["npm", "run", "start"]