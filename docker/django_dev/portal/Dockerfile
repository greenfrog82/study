FROM ubuntu:16.04

# To install library to develop portal
RUN apt-get update
RUN apt-get install -y \
    python-dev \
    python-pip \
    libldap2-dev \
    libsasl2-dev \
    libssl-dev \
    python-subversion \
    subversion \
    freetds-dev \
    libmysqlclient-dev \
    redis-tools \
    redis-server \
    celeryd \
    memcached \
    python-svn

# To install usefull tools.
RUN apt-get install -y vim


# To install pip library
RUN pip install amqp==1.4.9 \
    anyjson==0.3.3 \
    astroid==1.4.8 \
    backports.functools-lru-cache==1.2.1 \
    billiard==3.3.0.23 \
    celery==3.1.23 \
    configparser==3.5.0 \
    coverage==4.2 \
    Django==1.3.7 \
    django-celery==3.1.10 \
    djangorestframework==2.3.13 \
    enum34==1.1.6 \
    flake8==3.0.4 \
    isort==4.2.5 \
    kombu==3.0.35 \
    lazy-object-proxy==1.2.2 \
    linecache2==1.0.0 \
    mccabe==0.5.2 \
    mysql==0.0.1 \
    MySQL-python==1.2.3 \
    nose==1.3.7 \
    nose-setenv==0.1.post1 \
    pycodestyle==2.0.0 \
    pyflakes==1.2.3 \
    pylint==1.6.4 \
    pymssql==2.1.0 \
    python-dateutil==1.5 \
    python-gettext==2.1 \
    python-ldap==2.4.10 \
    python-memcached==1.53 \
    pytz==2015.4 \
    redis==2.10.3 \
    selenium==2.53.0 \
    six==1.9.0 \
    traceback2==1.4.0 \
    unittest2==1.1.0 \
    wrapt==1.10.8 \
    requests==2.2.1 \
    mock==2.0.0

CMD ["/bin/bash"]
