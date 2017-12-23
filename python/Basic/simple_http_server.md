# About SimpleHTTPServer

SimpleHTTPServer는 Python의 built-in HTTP Server이다. 
SimpleHTTPServer는 GET과 HEAD Method에 대한 요청만 처리하는 아주 간단한 서버이지만, Python이 Linux 배포판들이나 Mac 등에 기본으로 설치되어 있는 경우가 많기 때문에 아주 간단한 기능의 Web Server가 필요한 경우 별도의 Web Server 설치 및 세팅없이 아주 간단하게 사용할 수 있다.

나의 경우 회사에서 특정 파일을 팀원들과 공유해야할 떄 SimpleHTTPServer를 잠시 열어두고 다른 팀원들이 Download 해 갈 수 있도록 하고 있다. 단 파일을 Download하게 하려면 문서파일은 안되고 실행 파일, 압축 파일등을 이용해야한다. 

## How to use SimpleHTTPServer

SimpleHTTPServer는 자신이 기동되는 경로의 파일들을 서비스한다. 
만약, 해당 경로에 index.html파일이 존재하면 브라우저에 index.html파일이 표현되고 그렇지 않으면 해당 경로가 표현된다.

다음 명령을 통해 SimpleHTTPServer를 실행 시킬 수 있으며 Port 옵션을 주지 않으면 8000(default port)로 기동된다. 

>python -m SimpleHTTPServer [port] 

## Reference

* [How to use SimpleHTTPServer](http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver)