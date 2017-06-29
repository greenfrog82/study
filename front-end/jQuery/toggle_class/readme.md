# jQuery의 toggleClass method에 대해서

toggleClass method는 selector를 통해 선택 된 elements에 classes를 toggling(쉽게 풀어쓰면 추가하고자 하는 classes가 존재하면 element에서 제거하고 존재하면 추가한다.)한다.
toggleClass method는 jQuery의 버전마다 추가 된 형태가 다른다. 각 버전 별 추가 된 toggleClass method의 형태는 다음과 같다.

* toggleClass(className) is added in version 1.0
* toggleClass(className, state) is added in version 1.3
* toggleClass(function[,state]) is added in version 1.4

### toggleClass(className)

parameter로 전달받은 className을 toggling한다.

**예제**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Data</title>
<style>
  .highlight {
    background-color: yellow;
  }
</style>
<script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
<script>
$(document).ready(function() {
  $('p').click(function() {
    $('p').toggleClass('highlight');
  })
});
</script>
</head>
<body>
  <p><span>Please click this sentence.</span></p>
</body>
</html>
```

### toggleClass(className, state)

state에 따라 해당 className을 add할지 remove할지 결정한다. 이 형태의 메소드는 특정 조건에 따라 class를 적용할 때 유용하다.

**예제**

다음 예제는 'Please click this sentence.' 문장을 사용자가 클릭 할 때, 클릭한 횟수가 짝수가 되면 문장을 highlight하고 그렇지 않으면 highlight를 해제한다.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Data</title>
<style>
  .highlight {
    background-color: yellow;
  }
</style>
<script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
<script>
$(document).ready(function() {
  var count = 1;
  var sentence = $('span').text();

  $('p').click(function() {
    $('p').toggleClass('highlight', count % 2 == 0);
    $('span').text('[' + (count++) + '] ' + sentence);
  })
});
</script>
</head>
<body>
  <p><span>Please click this sentence.</span></p>
</body>
</html>
```

### toggleClass(function[,state])

다음 형태의 function을 인자로 사용한다.

```javascript
function(index, old_className, state) {
  return className;
}
```

위 function의 인자는 다음과 같다.

* index : selector를 통해 찾은 element의 index
* old_className : selector를 통해 찾은 element에 적용되어 있는 class name
* state : ?? 실제 예제를 만들어서 테스트해보았지만 undefined만 넘어와서 무슨 용도인지 알 수 없음. 다만 문서해서는 해당 return하는 className이 element에 추가 되어야하는지 제거 되어야하는지 결정하기 위한 값이라고 되어있음.

return값은 선택 된 element에 toggling하고자 하는 class name이다.

이 형태의 toogleClass method는 선택 된 여러개의 element들에 따라 다른 class name을 toggling 하고자 할 때 사용하면 유용하다.

**예제**

다음 에제는 선택 된 element들 중 첫번째 element는 yellow 색상으로 highligh하고, 두번째 element는 skyblue 색상으로 highlight하는 예제이다.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Data</title>
<style>
  .highlight {
    background-color: yellow;
  }
  .highlight_sub {
    background-color: skyblue;
  }
</style>
<script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
<script>
$(document).ready(function() {
  $('p').click(function() {
    $('p').toggleClass(function(index) {
      if(0 == index) {
        return 'highlight';
      } else {
        return 'highlight_sub';
      }
    });
  })
});
</script>
</head>
<body>
  <p><span>Please click this sentence.</span></p>
  <p><span>Please click this sentence.</span></p>
</body>
</html>
```

### 참고

toggleClass method가 특정 element에 class name을 추가 또는 삭제하기 때문에 addClass method나 removeClass method와 같아 보일 수 있다. 하지만 **addClass 또는 removeClass의 경우 class name을 추가 또는 삭제만 하지만 toggleClass의 경우는 toggling하는 차이점이 있다.**

## 참조

* [.toggleClass()](http://api.jquery.com/toggleclass/)
* [difference between toggleclass and addclass](https://stackoverflow.com/questions/8342396/difference-between-toggleclass-and-addclass)
