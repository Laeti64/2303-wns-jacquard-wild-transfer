FROM node:16-alpine

RUN mkdir app

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY ormconfig.js ./
COPY . ./Uploads
COPY .gitignore ./

COPY . .
RUN yarn install

RUN chmod -R 755 ./Uploads

EXPOSE 5005

