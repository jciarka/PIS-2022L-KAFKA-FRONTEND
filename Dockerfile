# prerequisits:
#           gradle build
# build (use correct version):
#           docker build -t kafka-producer-front:0.0.1 .
# run:
#           sudo docker run --name kafka-front --env REACT_APP_BACKEND_URL=http://192.168.0.109:9090/ -d -p 3001:3000 kafka-producer-front:0.0.1

# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]