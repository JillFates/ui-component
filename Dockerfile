# base image
FROM node:10.16.0

RUN apt-get update

RUN mkdir /ui-components
COPY . /ui-components

WORKDIR /ui-components

#
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" D8D4B96E-CF6C-4F99-8C59-3795EF6819EC
# install dependencies
RUN npm install
RUN npm run test:ci

EXPOSE 80

# Init Server
CMD npm run start:deploy
