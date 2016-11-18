# [7kyu] All Inclusive?

### Description

##### Input:

a string strng
an array of strings arr
Output of function contain_all_rots(strng, arr) (or containAllRots or contain-all-rots):

a boolean true if all rotations of strng are included in arr
false otherwise

##### Example:

contain_all_rots(
  "bsjq", ["bsjq", "qbsj", "sjqb", "twZNsslC", "jqbs"]) -> true

contain_all_rots(
  "Ajylvpy", ["Ajylvpy", "ylvpyAj", "jylvpyA", "lvpyAjy", "pyAjylv", "vpyAjyl", "ipywee"]) -> false)

##### Note:

Though not correct in a mathematical sense

* we will consider that there are no rotations of strng == ""
* and for any array arr: contain_all_rots("", arr) --> true

Ref: https://en.wikipedia.org/wiki/String_(computer_science)#Rotations

### My Solution

```javascript
function containAllRots(string, arr) {
    if('' === string || 0 >= arr.legnth) {
      return true;
    }

    let matchCount = 0;
    for(let i=0; i<string.length; i++) {
      const base = string.substring(0, string.length - 1);
      string = string[string.length - 1].concat(base);

      if(-1 < arr.indexOf(string)) {
        matchCount++;
      }
    }

    return matchCount === string.length;
}
```

### Others Solutions

```javascript
function containAllRots(strng, arr) {
    function rotate(s) {
       return s.substring(1) + s[0];  
    }
    for(var i = 0, l = strng.length; i < l; ++i) {
        if (arr.indexOf(strng) === -1) {
            return false;
        }
        strng = rotate(strng);
    }
    return true;
}
```

```javascript
function containAllRots(str, arr) {
  for (var i = 0; i < str.length; i++) {
    if (arr.indexOf(str.slice(i) + str.slice(0, i)) === -1) {
      return false
    }
  }
  return true
}
```
