# [4kyu] Pascal's Triangle

### Description

![pascal-triangle](PascalTriangleAnimated2.gif)

Wikipedia article on Pascal's Triangle: http://en.wikipedia.org/wiki/Pascal's_triangle

Write a function that, given a depth (n), returns a single-dimensional array representing Pascal's Triangle to the n-th level.

For example:

pascalsTriangle(4) == [1,1,1,1,2,1,1,3,3,1]


### My Solution

```javascript
function pascalsTriangle(n) {
  let offset = 0;
  let cursor = 0;

  const ret = [];

  for(let i=0; i<n; i++) {
    for(let j=0; j<=i; j++) {
      if(0 === j || j === i) {
        ret.push(1);
      } else {
        ret.push(ret[cursor] + ret[cursor + 1]);
        cursor++;
      }
    }
    offset += i;
    cursor = offset;
  }
  return ret;
}
```

### Others Solutions

```javascript
function pascalsTriangle(n) {
  var pascal = [];
  var idx = 0;

  for ( var i = 0; i < n; i++ ) {
    idx = pascal.length - i;
    for ( var j = 0; j < i+1; j++ ) {
      if ( j === 0 || j === i ) {
        pascal.push(1);
      } else {
        pascal.push( pascal[ idx+j ] + pascal[ idx+j-1 ] );
      }
    }
  }

  return pascal;
}
```

```javascript
function pascalsTriangle(n) {
  if (n === 1) {
    return [1];
  }
  var prev = pascalsTriangle(n - 1), len = prev.length;
  prev.push(1);
  for (var i = len - n + 1; i < len - 1; i ++) {
    prev.push(prev[i] + prev[i + 1]);
  }
  prev.push(1);
  return prev;
}
```
