# Deep Copy

순수하게 자바스크립트를 사용해서 Deep Copy를 하는 방법에 대해서 소개한다.

### Custom Function

[ex_1.js](./src/ex_1.js)
```javascript
function deepCopy(o) {
    var copy = o,k;

    if (o && typeof o === 'object') {
        copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
        for (k in o) {
            copy[k] = deepCopy(o[k]);
        }
    }

    return copy;
}
```

### JSON

[ex_2.js](./src/ex_2.js)
```javascript
var o = {
 a: 1,
 b: 2,
 sum: function() { return a + b; }
};

var o2 = JSON.parse(JSON.stringify(o));
console.log(o2);
```

## 참조

* [4 CREATIVE WAYS TO CLONE OBJECTS](http://heyjavascript.com/4-creative-ways-to-clone-objects/#)
* [Deep Copy vs JSON Stringify / JSON Parse](https://jsperf.com/deep-copy-vs-json-stringify-json-parse/45)
* [javascript deep copy using JSON](http://stackoverflow.com/questions/20662319/javascript-deep-copy-using-json)
