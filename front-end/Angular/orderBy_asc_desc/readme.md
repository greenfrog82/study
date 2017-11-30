# Filter의 orderBy 사용 시 asc, desc 설정하기

## 개발 환경

* Ubuntu 14.04
* PyCharm 2016.3.2
* Angular.js 1.4.8

## 개요

[tutorialspoint, AngularJS - Filters](https://www.tutorialspoint.com/angularjs/angularjs_filters.htm)를 따라하다가 orderBy 필터를 사용하는 부분이 있는데
asc, desc를 설정하는 내용이 설명되어 있지 않아서 관련 내용을 찾아봤다.

[ANGULARJS, / API Reference / ng / filter components in ng / orderBy](https://docs.angularjs.org/api/ng/filter/orderBy)의 중간쯤에 다음과 같은 내용이 있다.

```
An expression can be optionally prefixed with + or - to control the sorting direction, ascending or descending.
For example, '+label' or '-label'. If no property is provided, (e.g. '+' or '-'), the collection element itself is used in comparisons.

Note: If the predicate is missing or empty then it defaults to '+'.
```

* asc : orderBy를 하는 속성명 앞에 '+'를 붙여준다.
* desc : orderBy를 하는 속성명 앞에 '-'를 붙여준다.
* default : asc가 기본값으로 설정되어 있다.

## 예제

### 오름차순 정렬
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>orderBy asc, desc</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script>
        var mainApp = angular.module("mainApp", []);

         mainApp.controller('studentController', function($scope) {
            $scope.subjects = [
              {name:'Physics',marks:70},
              {name:'Chemistry',marks:80},
              {name:'Math',marks:65}
            ];
         });
    </script>
</head>
<body>
    <div ng-app="mainApp" ng-controller="studentController">
        <ul>
            <!-- marks 속성을 기준으로 오름차순 정렬(기본값) -->
            <li ng-repeat = "subject in subjects | orderBy:'marks'">
                {{ subject.name + ', marks : ' + subject.marks}}
            </li>
        </ul>
    </div>
</body>
</html>
```

### 내림차순 정렬
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>orderBy asc, desc</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script>
        var mainApp = angular.module("mainApp", []);

         mainApp.controller('studentController', function($scope) {
            $scope.subjects = [
              {name:'Physics',marks:70},
              {name:'Chemistry',marks:80},
              {name:'Math',marks:65}
            ];
         });
    </script>
</head>
<body>
    <div ng-app="mainApp" ng-controller="studentController">
        <ul>
            <!-- marks 속성을 기준으로 내림차순 정렬 -->
            <li ng-repeat = "subject in subjects | orderBy:'-marks'">
                {{ subject.name + ', marks : ' + subject.marks}}
            </li>
        </ul>
    </div>
</body>
</html>
```


## 참조

* [tutorialspoint, AngularJS - Filters](https://www.tutorialspoint.com/angularjs/angularjs_filters.htm)
* [ANGULARJS, / API Reference / ng / filter components in ng / orderBy](https://docs.angularjs.org/api/ng/filter/orderBy)

