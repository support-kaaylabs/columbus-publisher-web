# build environment
FROM node:16.0.0-alpine3.11 as build

WORKDIR /apps

RUN node --version

RUN npm --version

COPY package*.json .npmrc /apps/

RUN npm install 

COPY . /apps

RUN npm run build

RUN ls -ltr

# Confirm the working directory

EXPOSE  3000

CMD ["npm", "start"]
