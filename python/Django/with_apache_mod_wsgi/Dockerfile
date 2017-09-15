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

# To install apache and mod-wsgi
RUN apt-get install -y \
    apache2 \
    apache2-doc \
    apache2-utils \
    apache2-dev \ 
    libapache2-mod-wsgi

# To install pip library
RUN pip install --upgrade pip
RUN pip install Django==1.11.5 \
    MySQL-python==1.2.5

WORKDIR /tmp
COPY ./lib .

RUN tar xvzf mod_wsgi-4.5.17.tar.gz
WORKDIR mod_wsgi-4.5.17
RUN ./configure
RUN make
RUN make install

WORKDIR /develop

