# [Strip Url Params](https://www.codewars.com/kata/strip-url-params/train/javascript)

Complete the method so that it does the following:

* Removes any duplicate query string parameters from the url
* Removes any query string parameters specified within the 2nd argument (optional array)

Examples:

```
stripUrlParams('www.codewars.com?a=1&b=2&a=2') // returns 'www.codewars.com?a=1&b=2'
stripUrlParams('www.codewars.com?a=1&b=2&a=2', ['b']) // returns 'www.codewars.com?a=1'
stripUrlParams('www.codewars.com', ['b']) // returns 'www.codewars.com'
```

## My Solution

```javascript
function stripUrlParams(url, paramsToStrip) {
    const splitedUrl = url.split('?');
    if(1 >= splitedUrl.length) {
        return url;
    } else {
        const set = new Set();
        let queryParam = '';
        const params = splitedUrl[1].split('&');
        params.forEach(param => {
            const varName = param.split('=')[0];
            if(set.has(varName) || ((paramsToStrip)? paramsToStrip.includes(varName): false)) {
                return;
            }
            set.add(varName);
            queryParam += ('' === queryParam)? param: `&${param}`;
        });
        return (queryParam)? `${splitedUrl[0]}?${queryParam}`: splitedUrl[0];
    }
}
```

## Other Solutions

```javascript
function stripUrlParams(url, paramsToStrip){
  return url.replace(/&?([^?=]+)=.+?/g, function(m, p1, qPos) {
    return url.indexOf(p1 + '=') < qPos || (paramsToStrip||[]).indexOf(p1) > -1 ? "": m;
   });
}
```

```javascript
function stripUrlParams(url, paramsToStrip){
  paramsToStrip = paramsToStrip && paramsToStrip.slice() || [];
  return url.replace(/&?([^?=]+)=[^&]+/g, function(match, key) {
    return (paramsToStrip.indexOf(key) !== -1) ? '' : (paramsToStrip.push(key), match);
  });
}
```