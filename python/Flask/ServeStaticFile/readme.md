# Flask를 통해서 static 파일 서비스하기


## 개발 환경

* Ubuntu 14.04
* PyCharm 2016.3.2
* Python 3.4
* Flask 0.12


## 개요

Flask를 통해서 static 파일 서비스하는 방법에 대해서 설명한다.

## 설명

PyCharm을 통해 Flask 프로젝트를 생성한 후 static경로에 서비스를 위한 html코드를 하나 만들어 놓는다. 나의 경우는 index.html이라고 하나 만들었다.

<project_name>.py 파일을 다음과 같이 수정한다.

```python
from flask import Flask

app = Flask(__name__, static_url_path='')

@app.route('/')
def root():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run()
```

### static_url_path

해당 파라메터에 대해서 공식문서를 보면 다음과 같이 나와있다.

> static_url_path – can be used to specify a different path for the static files on the web. Defaults to the name of the static_folder folder.

즉, static 파일이 존재하는 경로를 명시하는 파라메터이다. 위 예제에서 static_url_path=''로 설정해놓았는데 이렇게 하면 프로젝트 경로의 static 폴더를 기본으로 설정하고,
다른 경로를 설정할 경우 설정 된 경로를 static 파일이 존재하는 경로로 간주한다.

### send_static_file

해당 메소드에 대해서 공식 문서를 보면 다음과 같이 나와있다.

> send_static_file(filename)
Function used internally to send static files from the static folder to the browser.

static_url_path에 설정되어 있는 경로에 존재하는 static 파일을 읽어서 웹 브라우저로 전달는 역할을 한다.


## 참조

* [How to serve static files in Flask](http://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask)
* [class flask.Flask](http://flask.pocoo.org/docs/0.12/api/#flask.Flask)
* [send_static_file](http://flask.pocoo.org/docs/0.12/api/#flask.Flask.send_static_file)