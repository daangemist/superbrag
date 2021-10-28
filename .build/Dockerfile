FROM node:16-slim

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/
RUN npm ci --production

COPY build /app/build
COPY assets /app/assets
COPY views /app/views

# For docker, setup a separate /data folder
RUN mkdir /data
ENV DB=sqlite:///data/db.sqlite

ENTRYPOINT [ "npm", "start"]
