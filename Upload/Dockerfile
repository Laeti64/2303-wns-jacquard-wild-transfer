FROM node:16-alpine

RUN mkdir app

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .gitignore ./

RUN yarn install
COPY src src

RUN chmod -R 755 ./

EXPOSE 5005
