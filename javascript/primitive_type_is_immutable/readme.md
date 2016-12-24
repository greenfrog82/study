# 자바스크립트의 Primitive타입은 불변이다.

얼마전에 string타입의 속성을 갖는 객체를 [Object.assign](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)을 통해서 클론하였다.
[Object.assign](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)은 Shallow Copy를 수행하기 때문에 string타입이 불변이 아니면 다른 방법으로 클론을 했어야했다. 즉, string타입이 제공하는 메소드들 중 하나라도 데이터를 변경해버리면 안되었다. 따라서 자바스크립트에서 string타입이 불변인지 확인해보았다.

[w3shools.com](http://www.w3schools.com/)의 [JavaScript String Method](http://www.w3schools.com/js/js_string_methods.asp)의 내용을 보면 다음과 같은 내용이있다.

```
All string methods return a new string. They don't modify the original string.
Formally said: Strings are immutable: Strings cannot be changed, only replaced.
```

 [Are JavaScript strings immutable? Do I need a “string builder” in JavaScript?](http://stackoverflow.com/questions/51185/are-javascript-strings-immutable-do-i-need-a-string-builder-in-javascript)에도 다음과 같은 내용이있다.

 ```
 They are immutable. You cannot change a character within a string
 with something like var myString = "abbdef"; myString[2] = 'c'.
 The string manipulation methods such as trim, slice return new strings.
 ```

 마지막으로 [JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)의 다음 내용은 보면 자바스크립트의 **모든 primitive 타입은 불변인것이었다 ...**

```
Primitive values

All types except objects define immutable values
(values, which are incapable of being changed).
For example and unlike to C, Strings are immutable.
We refer to values of these types as "primitive values".
```

## 참조

* [w3shools.com - JavaScript String Method](http://www.w3schools.com/js/js_string_methods.asp)
* [Are JavaScript strings immutable? Do I need a “string builder” in JavaScript?](http://stackoverflow.com/questions/51185/are-javascript-strings-immutable-do-i-need-a-string-builder-in-javascript)
* [JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
