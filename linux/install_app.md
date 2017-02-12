# 프로그램 설치하기(압축으로 제공되는 프로그램)

## 개요

우분투를 사용하면서, apt-get 저장소에서 아직 제공하지 않는 최신 버전의 프로그램을 사용하고 싶은 경우가 있다.
예를들어, PyCharm의 경우 공식 홈페이지에서 리눅스용 배포본을 다운로드 받으면 pycharm-professional-2016.3.2.tar.gz 파일 안에 실행 쉘 파일과 라이브러리들이 모두 들어있다.
이러한 경우 압축파일을 어떻게 설치해야할까? 그냥 아무곳이나 압축을 풀고 사용하면 될까? 그렇게 되면 압축파일로 제공되는 프로그램의 관리의 일관성이 떨어지게 될 것이다. 
예를들어, 일반적으로 Program Files 경로에 프로그램을 설치하고 관리한다.

이와 같이 리눅스에서도 압축파일로 제공되는 프로그램을 설치해야하는 위치를 알아보고 설치하는 방법을 알아보도록 하자.

## 적절한 위치

리눅스 시스템에서 일반 사용자들을 위한 응용프로그램의 실행파일이 존재하는 위치는 /usr/bin 경로이다. 

그러면, 압축파일은 어디에 풀어놔야할까? /usr/local의 경우는 소스파일로 제공되는 프로그램을 설치할 때 사용되므로 적절해보이지 않는다.

/opt 경로는 리눅스에서 기본으로 제공하지 않는 프로그램 예를들어, PyCharm과 같은 프로그램을 설치하기 위한 경로라는 설명을 찾았다. 여기가 적절해보인다.

어떤 문서에는 레드햇 리눅스의 경우는 /opt 경로를 구성하지 않고 /usr/local 경로를 사용하도록 한다고 하지만, 나는 우분투를 사용하고 우분투에는 /opt 경로가 존재하므로 이 경로를 사용하기로 했다.

## PyCharm 설치해보기

PyCharm의 경우 공식 홈페이지에서 리눅스용 배포본을 다운로드 받으면 pycharm-professional-2016.3.2.tar.gz 파일을 다운로드 한다. 

pycharm-professional-2016.3.2.tar.gz파일을 /opt에 복사한 후 압축을 푼 후 다음 명령을 통해 /usr/bin 경로에 심볼릭 링크를 생성한다. 

> sudo ln -s /opt/pycharm-2016.3.2/bin/pycharm.sh /usr/bin/pycharm

## 참조

* [INSTALL FIREFOX 28.0 ON UBUNTU / LINUXMINT / CENTOS / OPENSUSE](http://www.askmetutorials.com/2014/03/install-firefox-280-on-ubuntu-linuxmint.html)
* [리눅스 파일/디렉토리 파헤치기](http://coffeenix.net/doc/kuls/file_system-4.html)
* [주요 디렉토리 설명](http://blog.habonyphp.com/entry/%EB%A6%AC%EB%88%85%EC%8A%A4-%EC%A3%BC%EC%9A%94-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%EC%84%A4%EB%AA%85#.WKBsczt96Uk)
* [리눅스 디렉토리(2)](http://ssongyoon.tistory.com/entry/%EB%A6%AC%EB%88%85%EC%8A%A4-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC2)