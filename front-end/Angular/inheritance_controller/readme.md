# Controller 상속하기 (in AngularJS version 1)

코드를 재사용하여 중복코드를 없애는 방법은 **상속**과 **합성**이 대표적이다.
일반적으로 코드의 재사용성을 높이고 커플링을 최소화하기 위해서는 **합성**을 사용하지만, 기존에 존재하던 클래스들이 **합성**을 염두해두고 개발이 되어 있지 않다면 확장을 위해 기존코드까지 수정이 가해져야한다. 이러한 경우 수정 된 코드들에 대한 테스트 비용까지 감안하면 **상속**으로 문제를 해결하는 것이 좀 더 좋은 선택이 될 수 있다.

최근에 기존에 존재하던 화면에서 몇가지 기능만 다른 화면을 구현하게 되었다. 따라서 기존 화면에서 사용하던 Controller의 대부분의 method들을 재활용하고 몇몇 method들만 override하면 간단히 문제를 해결할 수 있었다.

따라서, AngularJS version 1에서 Controller를 상속하는 방법을 찾아보았다.

Controller를 상속하기 위해서는 **$controller 서비스**를 사용하는데 이 서비스를 사용하면 **다른 controller를 상속받고자 하는 controller에 Injection함으로써 상속이 이루어지도록 할 수 있다.**

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
          $controller('baseCtrl', {$scope: $scope});

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

### Update

위 방법을 통해 기존에 있던 controller를 확장하려고 했는데 다음과 같은 경우 의도한데로 controller를 확장할 수 없다.
다음과 같이 baseCtrl에 내부적으로 초기화 함수가 있다. 이 초기화 함수는 controller가 생성되는 시점에 호출되어 서버에 ajax call을 하고 controller에서 필요한 데이터를 초기화한다. (예제가 아주 간단한데 문제를 간단하게 하기 위함이다.)

```javascript
app.controller('baseCtrl', function($scope) {
  function init() {
    console.log('api/base를 호출하여 필요한 데이터를 가져오고 $scope에 데이터를 채운다.');
  }
  init();
});
```

위 baseCtrl를 $controller 서비스를 통해서 확장해보자. 우선, 확장을 해보려고 다음과 같이 코드를 작성해보았다.

```javascript
app.controller('drivedCtrl', function($scope, $controller) {
  $controller('baseCtrl', {$scope: $scope});

  function init() {
    console.log('api/derived를 호출하여 필요한 데이터를 가져오고 $scope에 데이터를 채운다.');
  }
  init();
});
```

위 코드의 실행결과는 다음과 같은데, 어찌보면 당연한 결과이다. $conroller는 $injector를 통해 첫번째 인자로 전달 된 controller를 인스턴스화 하기 때문에 baseCtrl가 인스턴스화 되면서 baseCtrl에 정의되었던 init 함수가 호출되고 이후에 drivedCtrl에서 다시 정의한 init 함수가 호출되었기 때문이다.

```
api/base를 호출하여 필요한 데이터를 가져오고 $scope에 데이터를 채운다.
api/derived를 호출하여 필요한 데이터를 가져오고 $scope에 데이터를 채운다.
```

의도했던 것은 baseCtrl의 init 함수를 override하는 것이었는데, 위 코드는 결국 새로운 init 함수를 구현한 것이 되어버리기 때문에 의도한데로 되지 않았다.
따라서 이번에는 baseCtrl의 init 함수를 $scope에 할당하고 drivedCtrl에서 $scope에 할당 된 init 함수를 override 해보기로 하였다.

```javascript
app.controller('baseCtrl', function($scope) {
  $scope.init = function() {
    console.log('api/base를 호출하여 필요한 데이터를 가져오고 $scope에 데이터를 채운다.');
  }
  $scope.init();
});

app.controller('drivedCtrl', function($scope, $controller) {
  $controller('baseCtrl', {$scope: $scope});

  $scope.init = function() {
    console.log('api/derived를 호출하여 필요한 데이터를 가져오고 $scope에 데이터를 채운다.');
  }
  $scope.init();
});
```

결과는 처음과 같다. 당연하다. baseCtrl에서 호출한 $scope.init()이 실행 된 후 drivedCtrl에서 호출한 $scope.init() 또 호출되기 때문이다. 그러면 drivedCtrl에서 호출하고 있는 $scope.init()을 지운다면 ...

```javascript
app.controller('baseCtrl', function($scope) {
  $scope.init = function() {
    console.log('api/base를 호출하여 필요한 데이터를 가져오고 $scope에 데이터를 채운다.');
  }
  $scope.init();
});

app.controller('drivedCtrl', function($scope, $controller) {
  $controller('baseCtrl', {$scope: $scope});

  $scope.init = function() {
    console.log('api/derived를 호출하여 필요한 데이터를 가져오고 $scope에 데이터를 채운다.');
  }
  // $scope.init();
});
```

이번에는 drivedCtrl에 정의한 init 함수의 결과는 아예 출력되지 않는다. C++, Java, C#을 9년동안 했던 탓에 또 이런 시각으로 확장을 생각해버린 것이 문제였던것 같다. $controller 서비스를 통해 하고 싶었던 것은 Template Method Pattern을 통한 확장이었다. **하지만 AngualrJs의 controller에서 Template Method Pattern을 구현할 수 있는 방법이 딱히 없는 것 같다. $controller를 통해서 확장을 하면 injection 되는 controller가 바로 실행되어버리기 때문이다.**
또한, 설사 위 방법으로 init 함수를 override 할 수 있었다 하더라도 **init 함수는 controller 내부적으로만 사용하고자 했던 의도의 함수인데 $scope에 할당하므로써 외부로 노출되어버려 의도하지 않는 side effect를 만들어낼 여지도 생겨버린다.**

### 결론

결국, $controller 서비스를 통한 Template Method Pattern을 구현해보고자 헀던 시도는 실패하였고 **합성**을 통해서 문제를 해결하였다.
baseCtrl의 코드들을 factory로 만들고 drivedCtrl에서 해당 factory를 injection 받은 후 변경하고자 했던 기능들을 override하였다.

factory에서 p_settings는 controller의 prviate 변수 또는 함수를 저장하기 위한 object이다.

```javascript
var app = angular.module("app", []);

app.factory('baseFactory', function() {
  return {
    init: function($scope, p_settings) {
      p_settings.init = function() {
        console.log('api/base를 호출하여 필요한 데이터를 가져오고 $scope에 데이터를 채운다.');
        $scope.name = 'baseCtrl'
      }

      $scope.introduce = function() {
        return 'My name is ' + $scope.name
      }
    }
  }
});

app.controller('baseCtrl', function($scope, baseFactory) {
  var p_settings = {}
  baseFactory.init($scope, p_settings);
  p_settings.init();
});

app.controller('drivedCtrl', function($scope, baseFactory) {
  var p_settings = {}
  baseFactory.init($scope, p_settings);

  p_settings.init = function() {
    console.log('api/drived를 호출하여 필요한 데이터를 가져오고 $scope에 데이터를 채운다.');
    $scope.name = 'drivedCtrl'
  }
  p_settings.init();
});
```

## 참조

* [use case for $controller service in angularjs](https://stackoverflow.com/questions/27866620/use-case-for-controller-service-in-angularjs)
* [Can an AngularJS controller inherit from another controller in the same module?](https://stackoverflow.com/questions/18461263/can-an-angularjs-controller-inherit-from-another-controller-in-the-same-module)
* [https://docs.angularjs.org/api/ng/service/$controller](https://docs.angularjs.org/api/ng/service/$controller)
