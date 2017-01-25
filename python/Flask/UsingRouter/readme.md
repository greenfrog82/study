# Flask의 라우팅과 Angular.js 1의 $http 서비스를 통해 REST API 처리하기

## 개발 환경

Ubuntu 14.04
PyCharm 2016.3.2
Python 3.4
Flask 0.12
Angular 1.4.8

## 개요

Flask의 라우팅과 Angular.js 1의 $http 서비스를 통해 GET, POST로 간단한 REST API를 만들어보기로 한다.
GET과 POST 메소드 모두 단순히 클라이언트로부터 전달받은 메시지를 에코할 것이다.

## Flask에서 GET, POST 메소드를 처리하는 REST API 코드 작성

우선, 다음과 같이 하나의 메소드로 GET과 POST 메소드를 처리하고자 한다.

```python
@app.route('/data', methods=['GET', 'POST'])
def message():
```

하나의 메소드에서 GET과 POST 메소드를 처리하기 위해서는 request.method 프로퍼티를 사용한다. 이 프로퍼티는 클라이언트가 전달한 요청이 어떤 메소드인지를 문자열로 전달한다.

```python
@app.route('/data', methods=['GET', 'POST'])
def message():
    if 'GET' == request.method:
        # GET Method에 대한 처리 코드 작성
    elif 'POST' == request.method:
        # POST Method에 대한 처리 코드 작성
```

### GET 메소드

GET메소드로 전달 된 쿼리 스트링 값을 확인하기 위해서는 request.args 프로퍼티를 사용한다. 이 프로퍼티의 반환값은 [MultiDic](http://werkzeug.pocoo.org/docs/0.11/datastructures/#werkzeug.datastructures.MultiDict.get)으로 첫번째 인자에 쿼리 스트링의 key값을 넣어주면 된다. 나머지 인자들에 대해서는 링크를 참고하자.

다음 코드는 쿼리 스트링으로 전달 된 'message'라는 key에서 값을 꺼내어 '[GET] echo'라는 문자열을 앞에 붙여서 클라이언트에게 응답을 하는 코드이다.

```python
if 'GET' == request.method:
      msg = request.args.get('message')
      return '[GET] echo ' + msg
```

### POST 메소드

POST메소드로 전달 된 Body를 파싱하기 위해서는 [request.get_json()](http://flask.pocoo.org/docs/0.12/api/#flask.Request.get_json) 메소드를 사용한다. 이 메소드는 파이썬의 딕셔너리를 반환하게 되어있다. 자세한 내용은 여기 링크를 참고하자.

다음 코드는 Body를 파싱해서 'message'라는 key의 값을 꺼내어 '[POST] echo'라는 문자열을 앞에 붙여서 클라이언트에게 응답을 하는 코드이다.

```python
elif 'POST' == request.method:
      return '[POST] echo ' + request.get_json()['message']
```

#### 주의

POST메소드로 전달 된 Body를 파싱하는 방법을 찾다가 처음에는 [request.form](http://flask.pocoo.org/docs/0.12/api/#flask.Request.form)속성을 사용했었다. [MultiDic](http://werkzeug.pocoo.org/docs/0.11/datastructures/#werkzeug.datastructures.MultiDict.get)타입을 반환하는데 이 속성을 통해서는 클라이언트가 Content-Type을 'application/json'으로 보낼 경우 해당 속성은 None을 반환한다.
[request.form](http://flask.pocoo.org/docs/0.12/api/#flask.Request.form)속성은 클라이언트가 Content-Type을 'x-www-form-urlencoded'로 전달했을 때 채워지며, 이 타입은 일반적으 클라이언트가 <form>태그를 통해서 submit을 했을 때 사용된다.

반대로 클라이언트가 Content-Type을 'x-www-form-urlencoded' 전달했을 때, [request.get_json()](http://flask.pocoo.org/docs/0.12/api/#flask.Request.get_json)메소드는 None값을 반환할 것이다.

### 완성 된 예제

[Flask 예제](UsingRouter.py)
``` python
from flask import Flask, request, jsonify
import json

app = Flask(__name__)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/data', methods=['GET', 'POST'])
def message():
    if 'GET' == request.method:
        msg = request.args.get('message')
        return '[GET] echo ' + msg
    elif 'POST' == request.method:
        return '[POST] echo ' + request.get_json()['message']
    else:
        return 'There is no process to handle %s method.' % request.method


if __name__ == '__main__':
    app.run()

```

## Angular.js version 1에서 $http 서비스를 통해 GET, POST 메소드를 요청하는 코드 작성

$http 서비스는 Javascript의 [axios](https://www.npmjs.com/package/axios)와 동일한 역할을 하는 HTTP 클라이언트 모듈이다. [axios](https://www.npmjs.com/package/axios)와 동일하게 [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) 기반으로 구현되어있다.

두 메소드 모두 사용하는 방법은 동일하지만 각각의 메소드를 요청할 때 파라메터를 전달하는 방법이 다르다.

### GET 메소드

GET 메소드의 경우 $http.get 메소드의 두번째 인자를 params키를 갖는 오브젝트를 전달하고 params키의 값으로 파라메터 오브젝트를 만들어서 전달하면 된다.

```javascript
$http.get('/data', {
    params: {
        message: $scope.message
    }
}).then(
    function success(response) {
        $scope.message = response.data;
    },
    function error(response) {
        alert(response);
    }
)
```

### POST 메소드

POST 메소드의 경우 $http.post 메소드의 두번째 인자로 파라메터 오브젝트를 전달하면 된다.

```javascript
$http.post('/data', {message: $scope.message})
.then(
    function success(response) {
        $scope.message = response.data;
    },
    function error(response) {
        alert(response);
    }
)
```

## 참조

* [AngularJS passing data to $http.get request](http://stackoverflow.com/questions/13760070/angularjs-passing-data-to-http-get-request)
* [$http get parameters does not work](http://stackoverflow.com/questions/17225088/http-get-parameters-does-not-work)
* [How to get data recieved in Flask request](http://stackoverflow.com/questions/10434599/how-to-get-data-recieved-in-flask-request)
* [how to access form data using flask?](http://stackoverflow.com/questions/15855921/how-to-access-form-data-using-flask)
* [Quickstart](http://flask.pocoo.org/docs/0.12/quickstart/)
* [$http Service & How to POST JSON Data using AJAX & Spring MVC](https://hello-angularjs.appspot.com/angularjs-http-service-ajax-post-json-data-code-example)
* [Handle a POST Request In Flask [Python]](http://code.runnable.com/UhLMQLffO1YSAADK/handle-a-post-request-in-flask-for-python)
* [Flask request and application/json content type](http://stackoverflow.com/questions/14112336/flask-request-and-application-json-content-type)
* [In Flask, What is request.args and how is it used?](http://stackoverflow.com/questions/34671217/in-flask-what-is-request-args-and-how-is-it-used)
