# Controller 상속하기 (in AngularJS version 1)

코드를 재사용하여 중복코드를 없애는 방법은 **상속**과 **합성**이 대표적이다.
일반적으로 코드의 재사용성을 높이고 커플링을 최소화하기 위해서는 **합성**을 사용하지만, 기존에 존재하던 클래스들이 **합성**을 염두해두고 개발이 되어 있지 않다면 확장을 위해 기존코드까지 수정이 가해져야한다. 이러한 경우 수정 된 코드들에 대한 테스트 비용까지 감안하면 **상속**으로 문제를 해결하는 것이 좀 더 좋은 선택이 될 수 있다.

최근에 기존에 존재하던 화면에서 몇가지 기능만 다른 화면을 구현하게 되었다. 따라서 기존 화면에서 사용하던 Controller의 대부분의 method들을 재활용하고 몇몇 method들만 override하면 간단히 문제를 해결할 수 있었다.

따라서, AngularJS version 1에서 Controller를 상속하는 방법을 찾아보았다.

Controller를 상속하기 위해서는 $controller 서비스를 사용하는데 이 서비스를 사용하면 다른 controller를 상속받고자 하는 controller에 Injection함으로써 상속이 이루어지도록 할 수 있다.

다음은 관련 예제인데, 각각의 controller는 자신을 소개하는 역할을 하고 있는데 baseCtrl는 이름만을 소개하지만, derivedCtrl는 이름과 함께 직업도 소개하도록 확장되었다.

```html
<!DOCTYPE html>
<html lang="en" ng-app='app'>
<head>
    <meta charset="UTF-8">
    <title>orderBy asc, desc</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script>
        var app = angular.module("app", []);

        app.controller('baseCtrl', function($scope) {
          $scope.name = 'greenfrog'

          $scope.introduce = function() {
            return 'My name is ' + $scope.name;
          }
        });

        app.controller('drivedCtrl', function($scope, $controller) {
          var baseCtrl = $controller('baseCtrl', {$scope: $scope});
          console.log('baseCtrl : ', baseCtrl);
          console.log('baseCtrl.name : ', baseCtrl.name);

          $scope.job = 'full stack programmer';
          $scope.introduce = function() {
            return 'My name is ' + $scope.name + ' and job is ' + $scope.job;
          }
        });
    </script>
</head>
<body>
    <div ng-controller='baseCtrl'>
      Base Controller : {{ introduce() }}
    </div>
    <div ng-controller='drivedCtrl'>
      Drived Controller : {{ introduce() }}
    </div>
</body>
</html>
```

## 참조

* [use case for $controller service in angularjs](https://stackoverflow.com/questions/27866620/use-case-for-controller-service-in-angularjs)
* [Can an AngularJS controller inherit from another controller in the same module?](https://stackoverflow.com/questions/18461263/can-an-angularjs-controller-inherit-from-another-controller-in-the-same-module)
* [https://docs.angularjs.org/api/ng/service/$controller](https://docs.angularjs.org/api/ng/service/$controller)
