# build environment
FROM node:14.16.1-alpine3.11 as build

WORKDIR /apps

RUN node --version

RUN npm --version

RUN apk add git

COPY package*.json /apps/

RUN yarn install 

COPY . /apps

RUN yarn run build

RUN ls

# Confirm the working directory

RUN ls -ltr build/

# Production Environment

FROM nginx:1.19.6-alpine

COPY --from=build /apps/build /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/conf.d/

EXPOSE  80

CMD ["nginx", "-g", "daemon off;"]