# CSS 삭제하기

jQuery를 이용해서 이미 적용되어 있는 CSS를 삭제하려면 어떻게 해야할까? 뭔가 명시적인 함수가 있을 것 같지만 없다.
다음과 같이 css 메소드에 삭제하고자 하는 css key를 입력하고 value를 값으로 주면 된다.

```javascript
$(<css selector>).css('key', '');
```

만약, 여러개의 CSS를 삭제하려면 다음과 같이 object를 사용하면 된다.

```javascript
$(<css selector>).css({
  'key1': '',
  'key2': '',
});
```

## 참조

* [How to remove css property in JQuery](https://stackoverflow.com/questions/9405689/how-to-remove-css-property-in-jquery)
* [jQuery - remove style added with .css() function](https://stackoverflow.com/questions/4036857/jquery-remove-style-added-with-css-function)
