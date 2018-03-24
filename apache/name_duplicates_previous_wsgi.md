# What is the 'Name duplicates previous WSGI daemon definition.' error?

예전 서비스를 유지한 채 새로운 서비스를 하나 더 오픈해서 고객을 마이그레이션 하고자 한다고 가정하자.  
이를 위해서 아파치의 VHost 설정파일에서 예전 서비스의 VHost 설정을 유지한채로 이를 복사해서 새로운 서비스의 VHost 설정을 만들었다.  
다음과 같다. 

```xml
<VirtualHost *:80>
	ServerName old-service.com

	WSGIDaemonProcess old-service.com python-path=/develop processes=3 threads=3
	WSGIProcessGroup old-service.com
	WSGIScriptAlias / /develop/old/apache/django-docker.wsgi

	<Directory /develop/old/apache>
		<Files django-docker.wsgi>
			Require all granted
		</Files>
	</Directory>
</VirtualHost>

<VirtualHost *:80>
	ServerName new-service.com

	WSGIDaemonProcess old-service.com python-path=/develop processes=3 threads=3
	WSGIProcessGroup old-service.com
	WSGIScriptAlias / /develop/new/apache/django-docker.wsgi

	<Directory /develop/new/apache>
		<Files django-docker.wsgi>
			Require all granted
		</Files>
	</Directory>
</VirtualHost>
```

그리고 설정한 후 재시작 시켰을 때, 다음과 같은 에러가 발생하였다.  

```sh
root@jaeyoungcho-docker:/develop# service apache2 restart
 * Restarting web server apache2                                         [fail] 
 * The apache2 configtest failed.
Output of config test was:
AH00526: Syntax error on line 221 of /etc/apache2/sites-enabled/000-default.conf:
Name duplicates previous WSGI daemon definition.
Action 'configtest' failed.
The Apache error log may have more information.
```

위 에러에서 주목할 부분은 다음이다. 
다음 에러가 무엇을 의미하고 어떻게 해결하는지 알아보자. 

> Name duplicates previous WSGI daemon definition.

## What is this?

우선, 예러가 발생한 이유는 WSGIDeamonProcess의 이름이 동일하기 때문이다.  
앞선 아파치 웹 서버의 설정에서 예전 VHost 설정을 복사한 후 **ServerName** directive의 값만 바꿔주었기 때문이다.  

## How to resolve?

다음과 같이 새로운 VHost의 WSGIDeamonProcess의 이름을 변경해서 문제를 해결하였다. 

```XML
WSGIDaemonProcess new-service.com python-path=/develop processes=3 threads=3
```

## TODO

사실 이 문제는 WSGIDaemonProcess와 WSGIDeamonGroup의 설정을 이해하고 있지 않기 떄문에 발생한 문제이다.  
추후 관련 내용을 정리하도록 하자. 

## Reference

* [Name duplicates previous WSGI daemon definition
](https://stackoverflow.com/questions/39317200/name-duplicates-previous-wsgi-daemon-definition/39317370)