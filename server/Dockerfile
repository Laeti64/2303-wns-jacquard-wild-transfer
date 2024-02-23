FROM node:18-alpine

RUN mkdir app

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY .gitignore ./

RUN yarn install
COPY src src


