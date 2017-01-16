# Flask를 통해서 static 파일 서비스하기


## 개발 환경

* Ubuntu 14.04
* PyCharm 2016.3.2
* Python 3.4
* Flask 0.12


## 개요
# Flask를 통해서 static 파일 서비스하기


## 개발 환경

* Ubuntu 14.04
* PyCharm 2016.3.2
* Python 3.4
* Flask 0.12


## 개요

[tutorialspoint, AngularJS - Includes](https://www.tutorialspoint.com/angularjs/angularjs_includes.htm)진행 중 Chrome의 보안 설정으로 인해 개발 PC의 html을 include하는
 코드를 작성하고 테스트를 해보지 못했다.
 이를 테스트하기 위해 Flask를 통해 static 파일을 서비스해보기로 했다.

## 해결

PyCharm을 통해 Flask 프로젝트를 생성한 후 static경로에 테스트에 필요한 html코드들을 복사한 다음, <project_name>.py 파일을 다음과 같이 수정한다.

```python
from flask import Flask

app = Flask(__name__, static_url_path='')

@app.route('/')
def root():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run()
```

## 참조

* [How to serve static files in Flask](http://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask)


[tutorialspoint, AngularJS - Includes](https://www.tutorialspoint.com/angularjs/angularjs_includes.htm)진행 중 Chrome의 보안 설정으로 인해 개발 PC의 html을 include하는
 코드를 작성하고 테스트를 해보지 못했다.
 이를 테스트하기 위해 Flask를 통해 static 파일을 서비스해보기로 했다.

## 해결

PyCharm을 통해 Flask 프로젝트를 생성한 후 static경로에 테스트에 필요한 html코드들을 복사한 다음, <project_name>.py 파일을 다음과 같이 수정한다.

```python
from flask import Flask

# static_rul_path=''로 정의하여 Flask프로젝트의 static경로를 지정한다.
app = Flask(__name__, static_url_path='')

@app.route('/')
def root():
    # app.send_static_file('index.html') 메소드를 통해 서비스하고자 하는 static 파일명을 지정한다.
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run()
```

## 참조

* [How to serve static files in Flask](http://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask)

