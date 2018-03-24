# How to use format method 

다른 언어들을 사용하다가 자바스크립트를 사용할 때 아쉬운 것이 문자열을 조작할 때 format 기능이 없는 것이다. 
물론, ES6에서 Template Literals와 같이 다른 언어들에는 존재하지 않는 편리한 기능이 존재하지만 특정 포맷을 문자열로 저장해두고 활용할 수는 없기 때문에 format 함수가 필요한 영역이 분명히 있는것 같다.  
따라서, 해당 기능을 구현해둔 코드가 있는지 살펴보고 다음과 같이 구현해 보았다. 

```javascript
String.prototype.format = function() {
    let tmp = this;
    for(let idx=0; idx<arguments.length; idx++) {
        tmp = tmp.replace(new RegExp(`\\{${idx}\\}`, 'g'), arguments[idx]);

    }
    return tmp;
}

console.log('{0}/{1}/{0}'.format('app', 'resource'));
```

## Reference

* [Simple String.format() in javascript](https://coderwall.com/p/flonoa/simple-string-format-in-javascript)