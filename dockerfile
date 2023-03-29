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

RUN ls -ltr build/

# Production Environment

FROM nginx:1.19.6-alpine

COPY --from=build /apps/build /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/conf.d/

EXPOSE  80

CMD ["nginx", "-g", "daemon off;"]
