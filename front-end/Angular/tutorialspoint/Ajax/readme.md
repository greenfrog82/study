# [AngularJS - Ajax](https://www.tutorialspoint.com/angularjs/angularjs_ajax.htm) 예제

## 개발 환경

* Ubuntu 14.04
* PyCharm 2016.3.2
* Python 3.4
* Flask 0.12
* Angular 1.4.8

## 개요

[AngularJS - Ajax](https://www.tutorialspoint.com/angularjs/angularjs_ajax.htm) 예제를 그대로 따라하면 해당 코드를 테스트 할 수 없을 뿐만 아니라 오류가 발생한다.
웹 서버에 대한 설명이 없으므로 예제를 테스트할 수 없고, 예제 자체에도 문제가 있다. $https를 사용하는 부분과 Controller를 Application에 등록하지 않고 사용하는 부분;;

따라서, 이 예제를 옳바르게 동작할 수 있도록 수정해보자.

## 웹 서버 만들기

이 예제를 동작시키기 위해서는 [GET] 메소드 요청을 받아 json파일을 파싱한 다음 이를 응답해주는 웹 서버가 있어야한다. Flask를 통해 간단히 웹 서버를 생성하였다.

```python
@app.route('/data', methods=['GET'])
def data():
    dataJsonFileAbsPath = os.path.join(APP_STATIC, 'data.json')

    # data.json 파일을 dictionary로 읽어들인다.
    with open(dataJsonFileAbsPath) as json_data:
        d = json.load(json_data)

    #return make_response(json.dumps(d), 200)
    # data.json 파일을 dictionary로 읽어들인 데이터를 json형태의 문자열로 변환하여 응답한다.
    return json.dumps(d)
```

## 웹 서버로 [GET] /data API를 요청하고 이에 대한 응답을 처리하는 HTML 만들기

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script>
   function studentController($scope, $http) {
       # 웹 서버에 [GET] /data를 요청하고 이에 대한 응답을 $scope.students에 할당.
       $http.get('/data').then(
           function success(response) {
               console.log('[SUCCESS] ', response);
               $scope.students = response.data;
           },
           function error(response) {
               console.log('[FAIL] ', response);
           }
       )
   }
   const mainApp = angular.module('mainApp', []);
   mainApp.controller('studentController', studentController)
</script>
```

## 참조

* [The Hitchhiker's Guide to Python - JSON](http://docs.python-guide.org/en/latest/scenarios/json/)
* [w3schools.com, AngularJS AJAX - $http](AngularJS AJAX - $http)
* [tutorialspoint, AngularJS - Ajax](https://www.tutorialspoint.com/angularjs/angularjs_ajax.htm)
* [Flask: How to read a file in application root?](http://stackoverflow.com/questions/14825787/flask-how-to-read-a-file-in-application-root)
