# prerequisits:
#           gradle build
# build (use correct version):
#           docker build -t pis-kafka-prod-front:0.0.1 .
# run:
#           sudo docker run --name kafka-front --env REACT_APP_BACKEND_URL=http://192.168.0.109:9090/ -d -p 3001:3000 pis-kafka-prod-front:0.0.1   
# push:
#           sudo docker tag pis-kafka-prod-front:0.0.1 jciarka/pis-kafka-prod-front:0.0.1
#           sudo docker push jciarka/pis-kafka-prod-front:0.0.1
#
# deploy docker-compose:
#           docker-compose -f docker-compose.yaml down
#           docker-compose -f docker-compose.yaml up -d
#
# deploy kubernetes:
#           kubectl apply -f pis-kafka-prod-depl-map.yaml
#           kubectl apply -f pis-kafka-prod-depl.yaml
#           minikube service pis-kafka-prod-front-service
#           minikube service list

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