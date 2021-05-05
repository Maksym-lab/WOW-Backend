FROM node:10.15.0-alpine
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD [ "yarn", "start" ]
