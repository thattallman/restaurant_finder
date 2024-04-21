FROM node:20-alpine
WORKDIR /home/app
COPY *.json .
RUN npm install
RUN npm install nodemon -g
COPY . .
CMD [ "npm","run", "start" ]