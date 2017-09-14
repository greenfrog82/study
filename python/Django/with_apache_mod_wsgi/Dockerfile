FROM ubuntu:14.04

# To install library
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    python-dev \
    python-pip \
    libmysqlclient-dev

# To install usefull tools.
RUN apt-get install -y \
    vim \
    curl \
    mysql-client

# To install apache
RUN apt-get install -y \
    apache2 \
    apache2-doc \
    apache2-utils

# To install pip library
RUN pip install --upgrade pip
RUN pip install Django==1.11.5 \
    MySQL-python==1.2.5
