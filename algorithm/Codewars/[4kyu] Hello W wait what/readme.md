# [4kyu] Hello W... wait what

### Description

In order to stop too much communication from happening, your overlords declare that you are no longer allowed to use certain functionality in your code!

Disallowed functionality:

* Strings
* Numbers
* Regular Expressions
* Object keys named "Hello", "World", "HelloWorld" or anything similar.
* Functions named "Hello", "World", "HelloWorld" or anything similar.

**Without** using the above, output the string "Hello World!" to prove that there is always a way.

### My Solution

```javascript
var helloWorld = function () {
  function A() {}
  function a() {}
  function b() {}
  function Z() {}
  function f() {}
  function g() {}
  function j() {}
  function k() {}
  function i() {}
  function p() {}
  function q() {}
  function t() {}
  function x() {}

  const H = String.fromCharCode(a.name.charCodeAt(Number(false)) - Z.name.charCodeAt(Number(false)) + A.name.charCodeAt(Number(false)));
  const e = String.fromCharCode(a.name.charCodeAt(Number(false)) + k.name.charCodeAt(Number(false)) - g.name.charCodeAt(Number(false)));
  const l = String.fromCharCode(a.name.charCodeAt(Number(false)) + t.name.charCodeAt(Number(false)) - i.name.charCodeAt(Number(false)));
  const o = String.fromCharCode(a.name.charCodeAt(Number(false)) + p.name.charCodeAt(Number(false)) - b.name.charCodeAt(Number(false)));
  const space = String.fromCharCode(a.name.charCodeAt(Number(false)) - A.name.charCodeAt(Number(false)));
  const W = String.fromCharCode(a.name.charCodeAt(Number(false)) - (q.name.charCodeAt(Number(false)) - g.name.charCodeAt(Number(false))));
  const r = String.fromCharCode(a.name.charCodeAt(Number(false)) + (x.name.charCodeAt(Number(false)) - g.name.charCodeAt(Number(false))));
  const d = String.fromCharCode(a.name.charCodeAt(Number(false)) + (j.name.charCodeAt(Number(false)) - g.name.charCodeAt(Number(false))));
  const exMark = String.fromCharCode(b.name.charCodeAt(Number(false)) - A.name.charCodeAt(Number(false)));

  return H + e + l + l + o + space + W + o + r + l + d + exMark;
};
```

### Others Solutions

```javascript

```

```javascript
var helloWorld = function () {
    // Hello world!
    let H = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
    let e = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
    let l = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
    let o = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
    let space = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
    let W = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
    let r = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
    let d = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
    let exclamation = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
    return String.fromCharCode(H) +
        String.fromCharCode(e) +
        String.fromCharCode(l) +
        String.fromCharCode(l) +
        String.fromCharCode(o) +
        String.fromCharCode(space) +
        String.fromCharCode(W) +
        String.fromCharCode(o) +
        String.fromCharCode(r) +
        String.fromCharCode(l) +
        String.fromCharCode(d) +
        String.fromCharCode(exclamation);
}
```
