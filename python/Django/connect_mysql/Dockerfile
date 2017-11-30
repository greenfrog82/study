FROM ubuntu:16.04

# To install library
RUN apt-get update
RUN apt-get install -y \
    python-dev \
    python-pip \
    libmysqlclient-dev

# To install usefull tools.
RUN apt-get install -y vim \
    curl \
    mysql-client


# To install pip library
RUN pip install --upgrade pip
RUN pip install Django==1.11.5 \
    MySQL-python==1.2.5
