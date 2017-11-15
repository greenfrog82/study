# Running the Django application on apache web server with mod_wsgi

Django application을 apache web server에서 mod_wsgi를 통해 실행시키는 방법을 설명한다.
이를 설명하는데 사용된 제품들과 버전정보는 다음과 같다. 

* Ubuntu 16.04
* apache 
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

## Install Apache2 and mod_wsgi

Apache2와 mod_wsgi를 설치하는 방법은 [Dockerfile](./Dockerfile)에 정의되어 있다. 

다음은 [Dockerfile](./Dockerfile)에서 Apache2와 Apache2가 사용하기 위한 mod_wsgi 모듈을 설치하는 내용을 발췌한것이다.
```
# To install apache and mod-wsgi
RUN apt-get install -y \
    apache2 \
    apache2-doc \
    apache2-utils \
    apache2-dev \ 
    libapache2-mod-wsgi
```

다음은 [Dockerfile](./Dockerfile)에서 mod_wsgi 모듈을 pip을 통해서 설치하는 방법이다. 
```
pip install mod_wsgi==4.5.20
```

다음은 [Dockerfile](./Dockerfile)에서 mod_wsgi 모듈을 source 코드를 통해서 설치하는 방법이다. 
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

WSGI는 web server와 Python web application이 통신을 하기 위한 API 명세로, 파이썬 언어를 지원하는 여러 종류의 웹 서버에서 파이썬 웹 어플리케이션을 호스팅하기 위한 목적으로 사용된다. 
이 WSGI 명세를 구현한 제품들은 다음과 같다.

* mod_wsgi
* uwsgi
* gunicon
* etc ..

mod_wsgi는 Apache에서만 사용가능한 모듈이고, uwsgi나 gunicon의 경우 Apache, nginx 그리고 기타 이를 지원하는 웹 서버에서 사용가능하다. 
mod_wsgi가 Apache를 통해 파이썬 웹 어플리케이션을 실행하는 방법은 Embedded Mode와 Deamon Process Mode 두 가지가 있다. 

## Embedded Mode

### Overview

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

### Configuration

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
다음 설정을 추가한다. 

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


## Referecne

* [Install and Configure mod_wsgi on Ubuntu 16.04](https://devops.profitbricks.com/tutorials/install-and-configure-mod_wsgi-on-ubuntu-1604-1/)
* [How to use Django with Apache and mod_wsgi¶](https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/modwsgi/)
* [Apache Core Features](http://httpd.apache.org/docs/current/mod/core.html#directory)
* [mod_wsgi - Quick Configuration Guide](http://modwsgi.readthedocs.io/en/develop/user-guides/quick-configuration-guide.html#quick-configuration-guide)
* [DistrosDefaultLayout](https://wiki.apache.org/httpd/DistrosDefaultLayout)