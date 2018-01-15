# Comma Operator

jQuery 코드를 분석하다가 merge 메소드의 return문이 다음과 같이 comma로 연결되어있는 것을 봤다. 

```javascript
merge: function(a, b) {
    for (var c = +b.length, d = 0, e = a.length; d < c; d++)
        a[e++] = b[d];
        return a.length = e,
        a
    },
```



## Reference

* [Comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator)
* [return statement with multiple comma separated values [duplicate]](https://stackoverflow.com/questions/10284536/return-statement-with-multiple-comma-separated-values)