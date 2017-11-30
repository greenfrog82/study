FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y vim \
    curl


RUN curl -sL https://deb.nodesource.com/setup_7.x | bash
RUN apt-get install -y \
    nodejs

RUN npm install vue
RUN npm install --global vue-cli

