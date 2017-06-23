# jQuery의 remove method에 대해서

jQuery의 remove method는 empty method와 한가지만 빼면 완전히 동일하다. remove method의 경우 empty method와 달리 **selector를 통해 찾은 element까지 삭제한다.**

다음 html의 <p></p> 엘리먼트를 empty method와 remove method를 통해 삭제해보자.

```html
<div>
    <p><strong>foo</strong></p>
</div>
```

#### 먼저, empty method를 통해서 삭제해보자.

```javascript
$('p').empty()
```

위 코드의 실행 결과는 다음과 같다. selector로 찾은 <p></p> 엘리먼트는 남겨두고 child element만을 삭제하였다.

```html
<div>
  <p></p>
</div>
```

#### 이번에는 remove method를 통해서 삭제해보자.

```javascript
$('p').remove()
```

위 코드의 실행 결과는 다음과 같다. selector로 찾은 <p></p> 엘리먼트와 child element 모두 삭제하였다.

```html
<div></div>
```

## 참조

* [.remove()](https://api.jquery.com/remove/)
* [jQuery empty() vs remove()](https://stackoverflow.com/questions/3090662/jquery-empty-vs-remove)
