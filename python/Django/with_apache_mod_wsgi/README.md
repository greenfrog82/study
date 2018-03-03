# Running the Django application on apache web server with mod_wsgi in Docker

Docker에서 Django Application을 Apache Web Server와 mod_wsgi를 통해 실행시키는 방법을 설명한다.

#### Requirement

* Ubuntu 14.04
* Apache Web Server
    * Server version: Apache/2.4.27 (Ubuntu)
    * Server built:   2017-09-18T15:05:48
* mod_wsgi 4.5.17
* Django 1.11.5

아래 언급 된 아파치의 파일구조는 다음을 따른다. 해당 내용은 [DistrosDefaultLayout](https://wiki.apache.org/httpd/DistrosDefaultLayout)의 Ubuntu 관련 내용을 발췌하였다. 

```
ServerRoot              ::      /etc/apache2
DocumentRoot            ::      /var/www
Apache Config Files     ::      /etc/apache2/apache2.conf
                        ::      /etc/apache2/ports.conf
Default VHost Config    ::      /etc/apache2/sites-available/default, /etc/apache2/sites-enabled/000-default
Module Locations        ::      /etc/apache2/mods-available, /etc/apache2/mods-enabled
ErrorLog                ::      /var/log/apache2/error.log
AccessLog               ::      /var/log/apache2/access.log
cgi-bin                 ::      /usr/lib/cgi-bin
binaries (apachectl)    ::      /usr/sbin
start/stop              ::      /etc/init.d/apache2 (start|stop|restart|reload|force-reload|start-htcacheclean|stop-htcacheclean)
```

## Installing Apache2 and mod_wsgi

Apache2와 mod_wsgi를 설치하는 방법은 [Dockerfile](./Dockerfile)에 정의되어 있다. 

### Apache2 

다음은 [Dockerfile](./Dockerfile)에서 Apache2 모듈을 설치하는 코드이다. 
```
# To install apache and mod-wsgi
RUN apt-get install -y \
    apache2 \
    apache2-doc \
    apache2-utils \
    apache2-dev \ 
    libapache2-mod-wsgi
```

### mod_wsgi

mod_wsgi를 설치하는 방법은 두 가지를 모두 시도해보았다. 

#### Using pip

다음은 [Dockerfile](./Dockerfile)에서 mod_wsgi 모듈을 pip을 통해서 설치하는 코드이다.

```
pip install mod_wsgi==4.5.20
```

#### Using source code 

다음은 [Dockerfile](./Dockerfile)에서 mod_wsgi 모듈을 source 코드를 통해서 설치하는 코드이다.   
pip이 더 간단하므로 이 방법은 주석처리되어있다. 참고만 하자.

```
# To install mod_wsgi 4.5.17 using source
COPY ./lib/mod_wsgi-4.5.17.tar.gz /tmp
WORKDIR /tmp
RUN tar xvzf mod_wsgi-4.5.17.tar.gz
WORKDIR ./mod_wsgi-4.5.17
RUN ./configure
RUN make
RUN make install
RUN make clean
```

## WSGI

WSGI는 Web Server와 Python Web Application이 통신을 하기 위한 API 명세로, 파이썬 언어를 지원하는 여러 종류의 웹 서버에서 파이썬 웹 어플리케이션을 호스팅하기 위한 목적으로 사용된다.   
이 WSGI 명세를 구현한 제품들은 다음과 같다.

* mod_wsgi (Only for Apache Web Server)
* uwsgi (Apache, Nginx, etc ...)
* gunicon (Apache, Nginx, etc ...)
* etc ..

mod_wsgi는 Apache에서만 사용가능한 모듈이고, uwsgi나 gunicon의 경우 Apache, Nginx 그리고 기타 이를 지원하는 웹 서버에서 사용가능하다. 
mod_wsgi가 Apache를 통해 파이썬 웹 어플리케이션을 실행하는 방법은 Embedded Mode와 Deamon Process Mode 두 가지가 있다. 

### Embedded Mode

아파치는 기본적으로 하나의 Apache Process에서 모든 Virtual Host를 서비스한다.
예를들어, 다음과 같이 2개의 Name based virtual host가 존재한다고 하자.

```xml
<VirtualHost *:443> 
    ServerName www.example.com
    ...
</VirtualHost>
<VirtualHost *:443> 
    ServerName www.test-example.com
    ...
</VIrtualHost>
```

#### Configuration

편집기를 통해 /etc/apache2/apache2.conf 파일을 열어 다음 설정을 추가한다. 

```xml
WSGIScriptAlias / /develop/mysite/wsgi.py
WSGIPythonPath /develop

<Directory /develop/mysite>
        <Files wsgi.py>
                Require all granted
        </Files>
</Directory>
```

## Daemon Mode

### Configuration

Embedded Mode와 달리 Daemon Mode를 적용하는 방법은 두 가지가 존재한다. 

1. /etc/apache2/apache2.conf에 설정하기
2. /etc/sites-available/000-default.conf (VHost 설정)에 설정하기

#### 1. /etc/apache2/apache2.conf에 설정하기

여기에 설정하면 당연히 모든 VHost가 설정에 영향을 받게된다. 
다음 설정을 추가하자.

```xml
WSGIDaemonProcess example.com python-path=/develop processes=2 threads=15
WSGIProcessGroup example.com
WSGIScriptAlias / /develop/mysite/wsgi.py

<Directory /develop/mysite>
        <Files wsgi.py>
                Require all granted
        </Files>
</Directory>
```

#### 2. /etc/sites-available/000-default.conf (VHost 설정)에 설정하기

앞서 /etc/apache2/apache2.conf의 설정과 동일한 설정을 서비스하고자하는 VHost 설정안에 넣어주면 된다.

```xml
<VirtualHost *:80>
        ServerName www.example.com

        #ServerAdmin webmaster@localhost
        #DocumentRoot /var/www/html

        WSGIDaemonProcess example.com python-path=/develop processes=2 threads=15
        WSGIProcessGroup example.com
        WSGIScriptAlias / /develop/mysite/wsgi.py

        <Directory /develop/mysite>
                <Files wsgi.py>
                        Require all granted
                </Files>
        </Directory>

        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

## Applying SSL

앞서 /etc/sites-available/000-default.conf의 설정에 SSL 설정을 추가해보자.  

### Activating ssl

Apache에 SSL 설정을 하기 위해서는 우선 다음 명령을 통해 ssl 모듈을 활성화 해야한다.

>$ sudo a2enmod ssl

### Generating a Self-signed Certificate

SSL에서 사용되는 서명은 Self-signed Certificate와 Commercial Certificate가 있지만, 개발, 테스트 또는 내부적인 용도로 사용할 때는 Self-signed Cretificate를 사용한다.  

나는 개발 목적으로 사용할 것이므로 Self-signed Certificate를 생성할 것이다.  
Self-signed Cretificate를 생성하는 과정은 다음과 같다. 

#### Creating private key (ca.key)

> $ openssl genrsa -out ca.key 2048

#### Generating signing request (ca.csr)

> $ openssl req -nodes -new -key ca.key -out ca.csr

#### Generating a self-signed certificate (ca.crt)

> $ openssl x509 -req -days 365 -in ca.csr -signkey ca.key -out ca.crt

위 과정에서 생성 된 파일들을 /etc/apache2/ssl 디렉토리를 생성 후 해당 디렉토리로 옮기자. 

> $ mkdir /etc/apache2/ssl
> $ mv ca.crt ca.key ca.csr /etc/apache2/ssl/

### To Configure Apache to use the SSL Certificate

이제 /etc/sites-available/000-default.conf 파일에 SSL 설정을 추가하자.

```xml
<VirtualHost *:443>
        ServerName www.example.com

        #ServerAdmin webmaster@localhost
        #DocumentRoot /var/www/html

        WSGIDaemonProcess example.com python-path=/develop processes=2 threads=15
        WSGIProcessGroup example.com
        WSGIScriptAlias / /develop/mysite/wsgi.py

        <Directory /develop/mysite>
                <Files wsgi.py>
                        Require all granted
                </Files>
        </Directory>

        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        SSLEngine on
        SSLCertificateFile /etc/apache2/ssl/ca.crt
        SSLCertificateKeyFile /etc/apache2/ssl/ca.key
</VirtualHost>
```

## Executing the Apache Web Server automatically

앞서 소개한 내용을 통해 Docker에서 Django Application을 Apache Web Server와 mod_wsgi를 통해 실행시키는 방법과 SSL 설정 방법을 알아보았다.
이제 Docker container가 실행 될 때 Apache Web Server가 자동으로 실행되도록 해보자. 

### Setting volume about Apache2 directory

앞서 Apache2 directory의 설정파일들을 편집해서 mod_wsgi 설정 및 SSL 설정을 하였다. 하지만 이들 설정은 Host와 Bind되어 있지 않기 때문에 Docker container가 삭제되면 모두 사라져버린다. 따라서 **volume**을 통해 해당 설정을 Host와 Bind하도록 한다. 

Docker container에 있는 파일 또는 디렉토리를 **volume**을 통해 Host와 Bind하는 것은 Host에 있는 경로를 Docker Container로 Bind하는 것과는 방법이 다르다. 왜냐하면, Bind하고자하는 파일 또는 디렉토리가 Host 파일 시스템에 존재하지 않기 때문이다.  
따라서, Docker container에 있는 파일 또는 디렉토리를 우선 Host 파일 시스템으로 복사해와야한다. 이를 위해 다음 명령을 사용해야한다. 

>$ docker cp <source> <destination>

그럼 위 명령을 통해 Docker container에 존재하는 /etc/apache2 경로를 Host의 config경로로 복사하도록 하자.  

>$ docker cp django_in_apache_modwsgi:/etc/apache2 config

복사가 완료되면 docker-compose.yml에 volume을 추가한다. 

```yml
volumes:
      - ./src:/develop
      - ./config/apache2:/etc/apache2 # added volum
```

## Referecne

* [Install and Configure mod_wsgi on Ubuntu 16.04](https://devops.profitbricks.com/tutorials/install-and-configure-mod_wsgi-on-ubuntu-1604-1/)
* [How to use Django with Apache and mod_wsgi¶](https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/modwsgi/)
* [Apache Core Features](http://httpd.apache.org/docs/current/mod/core.html#directory)
* [mod_wsgi - Quick Configuration Guide](http://modwsgi.readthedocs.io/en/develop/user-guides/quick-configuration-guide.html#quick-configuration-guide)
* [DistrosDefaultLayout](https://wiki.apache.org/httpd/DistrosDefaultLayout)
* [Setting up Apache Server with SSL Support on Ubuntu](https://www.maketecheasier.com/apache-server-ssl-support/)
* [How to automatically start a service when running a docker container?](https://stackoverflow.com/questions/25135897/how-to-automatically-start-a-service-when-running-a-docker-container)