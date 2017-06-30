# event.stopDefault()

event.stopDefault() 메소드는 특정 이벤트의 기본 동작을 하지 않도록 하는 것이다.

예를들어, checkbox의 click 이벤트의 기본동작은 checkbox를 check와 uncheck되도록 toggle하는 것이다.
이때, checkbox의 click 이벤트에 이벤트 핸들러를 추가하고 event.stopDefault() 메소드를 호출하면 toggle 동작을 하지 않는다.

다음 예제를 실행시켜보자. 앞선 설명과 같이 checkbox가 toggle되지 않는다.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title></title>
  <script>
    function perform() {
      event.preventDefault();
      console.log('preventDefault method is called.');
    }
  </script>
</head>
<body>
  <input type='checkbox' onclick='perform()'/> Click
</body>
</html>
```

event.cancelable 프로퍼티를 통해서 특정 이벤트의 기본 동작을 하지 않도록 하는 것이 가능한지 확인 할 수 있다.
먄약, event.cancelable 프로퍼티의 호출 결과가 false라면 event.preventDefault() 메소드를 호출한다 하더라도 특정 이벤트의 기본 동작을 취소할 수 없다.  

## 참조

* [Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
