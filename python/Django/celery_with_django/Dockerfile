From ubuntu:17.10

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y vim \
    curl \
    net-tools

RUN apt-get install -y \
    python-dev \
    python-pip

RUN pip install --upgrade pip
RUN pip install -y \
    django==1.8.2 \
    amqp==1.4.6 \
    anyjson==0.3.3 \
    billiard==3.3.0.20 \
    celery==3.1.18 \
    kombu==3.0.30 \
    pytz==2015.4 \
    redis==2.10.3 \
    requests==2.7.0

