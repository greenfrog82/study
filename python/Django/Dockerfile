FROM ubuntu:17.10

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
    MySQL-python==1.2.5 \
    mod_wsgi==4.5.20
