# Rewrite with Proxy

Rewrite 모듈과 Proxy 모듈에 대해서 알아본다. 

## Issues

### Invalid command 'RewriteEngine', perhaps misspelled or defined by a module not included in the server configuration

```
RewriteEngine on
RewriteRule /version www.example.com/version?prod=test
```

000-default.conf 파일의 VHost에 위와 같이 설정을 한 후 서버를 재식작했을 때 다음과 같은 오류 발생.

```
root@82102f45dbc4:/etc/apache2# /etc/init.d/apache2 restart
 * Restarting web server apache2                                                                                                                                                                              [fail] 
 * The apache2 configtest failed.
Output of config test was:
AH00526: Syntax error on line 54 of /etc/apache2/sites-enabled/000-default.conf:
Invalid command 'RewriteEngine', perhaps misspelled or defined by a module not included in the server configuration
Action 'configtest' failed.
The Apache error log may have more information.
```

위 오류는 rewrite 모듈이 비활성화인 상태일 때 발생한다. 따라서, a2enmod rewrite 명령을 이용해서 rewrite 모듈을 활성화한다.

```
root@82102f45dbc4:/etc/apache2# sudo a2enmod rewrite
Enabling module rewrite.
To activate the new configuration, you need to run:
  service apache2 restart
```

### rewrite:error

Browser로 rewrite되는 경로를 전달했을 때 **Bad Request**오류 발생하였다.
따라서 apache의 error.log를 확인해보니 다음과 같은 메시지를 확인하였다. 

```
[Wed Nov 15 09:11:21.680663 2017] [rewrite:error] [pid 646:tid 140297541961472] [client 172.18.0.1:39064] AH00669: attempt to make remote request from mod_rewrite without proxy enabled: proxy:http://www.test-example.com/www.example.com/hyperion/version
```

위 문제의 경우는 mod_proxy 모듈이 활성화 되지 않아 발생한 문제이다. 따라서 다음 명령을 통해 mod_proxy 모듈을 활성화 한 후 서버를 재시작 하였다. 

> $ sudo a2enmod proxy

### proxy:warn

mod_proxy 모듈 활성화 및 서버 재시작을 마치고 다시 요청을 시도했을 때 브라우저에서 Internal Server Error를 출력하였다. 
따라서 서버의 error.log를 확인한 결과 다음과 같은 메시지를 확인하였다. 

```
[Thu Nov 16 02:29:16.415185 2017] [proxy:warn] [pid 4215:tid 140068172048128] [client 172.18.0.1:37538] AH01144: No protocol handler was valid for the URL /version. If you are using a DSO version of mod_proxy, make sure the proxy submodules are included in the configuration using LoadModule.
```

위 문제를 해결하기 위해서는 mod_proxy_http 모듈이 활성화 되어 있어야한다. 따라서 다음 명령을 통해 해당 모듈을 활성화 하였다. 

> $ sudo a2enmod proxy_http


### SSL Proxy requested for www.test-example.com:443 but not enabled

Proxy를 통해 Rewrite를 하는 www.test-example.com VHost와 Proxy를 통해 Rewrite된 url을 처리하는 www.example.com VHost에 SSL을 설정한 후 테스트를 진행하였더니, 웹 브라우저에서 아래와 같은 에러 페이지를 출력하였다. 

```
Internal Server Error

The server encountered an internal error or misconfiguration and was unable to complete your request.

Please contact the server administrator, webmaster@localhost and inform them of the time the error occurred, and anything you might have done that may have caused the error.

More information about this error may be available in the server error log.

Apache/2.2.3 (CentOS) Server at www.test-example.com Port 443
```

따라서, 서버쪽 error.log를 확인해보니 다음과 같은 내용이 출력되어 있었다. 

```
[Thu Nov 16 01:33:10 2017] [error] [client 192.168.0.53] SSL Proxy requested for www.test-example.com:443 but not enabled [Hint: SSLProxyEngine]
[Thu Nov 16 01:33:10 2017] [error] proxy: HTTPS: failed to enable ssl support for 192.168.0.53:443 (www.example.com)
```

StackOverflow에서 [Proxying with SSL [closed]](https://stackoverflow.com/questions/6764852/proxying-with-ssl)의 내용을 참조해 문제를 해결하였다. 
위 내용에서는 URL에 대해서 Proxy를 할 계획이었으므로 ProxyPass와 ProxyPassReverse Directive를 사용하였지만, 나의 경우 특정 URL에 대해서 query string을 전달해야하는 이슈이므로 두 Directive를 생략하고 SSLProxyEngine Directive를 On하여 문제를 해결하였다. 

해결 방법은 다음과 같다.

```
SSLProxyEngine on
RewriteEngine on
RewriteRule /version http://127.0.0.1/hyperion/version?user=aurorauser&pass=cdn!@admin [P]
```

### [mpm_event:error] AH00484: server reached MaxRequestWorkers setting, raising the maxRequestWorkers setting

요청에 대한 Rewrite를 할 때, 요청이 처리되지 않고 브라우저는 계속 대기 중이고 최초 3개만 떠 있던 apache2 프로세스가 7개까지 늘어나는 현상이 발생하였다. 
이때 VHost 설정은 다음과 같다. 

```xml
<VirtualHost *:80>
  ServerName www.test-example.com
  ...
  RewriteEngin on
  RewriteRule /version http://localhost/version?user=greenfrog [P]
</VirtualHost>
<VirtualHost *:80>
  ServerName www.example.com  
  ...
  WSGIDaemonProcess example.com python-path=/develop processes=1 threads=15
  WSGIProcessGroup example.com
  WSGIScriptAlias / /develop/mysite/django.wsgi

  <Directory /develop/portal/prism_api/apache>
          <Files django.wsgi>
                  Require all granted
          </Files>
  </Directory>
</VirtualHost>
```

따라서 아파치의 error.log를 확인해본 결과 다음과 같은 에러메시지를 확인하였다. 

```
[Thu Nov 16 05:34:28.018716 2017] [mpm_event:error] [pid 1844:tid 139862468290432] AH00484: server reached MaxRequestWorkers setting, consider raising the MaxRequestWorkers setting
```

문제가 되는 부분은 RewirteRule에서 도메인을 localhost로 쓴것이다. 이것이 문제가 되는 원인은 정확히 알 수 없지만 다음과 같이 추론해볼 수 있다.
VHost는 현재 Named Base이다. 따라서 서비스를 찾는데 www.test-example.com 아니면 www.example.com으로 찾게된다. 그런데 Proxy를 통해 내보면 url은 localhost이므로 계속해서 요청을 시도하는 것으로 보인다. 따라서 현재 설정으로 요청을 처리할 수 Thread 수가 꽉 차서 발생한 문제로 보인다. 

위 문제를 해결하기 위해서는 localhost를 명시적올 www.example.com으로 수정해줘야한다. 


## Reference

* [How do I enable the mod_rewrite Apache module for Ubuntu 11.04?](https://askubuntu.com/questions/64454/how-do-i-enable-the-mod-rewrite-apache-module-for-ubuntu-11-04)
* [StackOverflow - Proxying with SSL [closed]](https://stackoverflow.com/questions/6764852/proxying-with-ssl)
* [Apache MPMs Explained](https://www.liquidweb.com/kb/apache-mpms-explained/)