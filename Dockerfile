# base image
FROM node:10.16.0

RUN apt-get update

RUN mkdir /ui-components
COPY . /ui-components

WORKDIR /ui-components

# install dependencies
RUN npm install

EXPOSE 80

# Init Server
CMD npm run start:deploy
