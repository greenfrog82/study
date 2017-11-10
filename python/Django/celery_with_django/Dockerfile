From ubuntu:16.04

RUN apt-get update
RUN apt-get install -y vim \
    curl

RUN apt-get install -y \
    python-dev \
    python-pip

RUN pip install django==1.8.2 \
    amqp==1.4.6 \
    anyjson==0.3.3 \
    billiard==3.3.0.20 \
    celery==3.1.18 \
    kombu==3.0.26 \
    pytz==2015.4 \
    redis==2.10.3 \
    requests==2.7.0

