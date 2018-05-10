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

### JavaScript 

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

### Python

```python
import re

def strip_url_params(url, params_to_strip = []):
    matched = re.match(r'^.+\?', url, re.M | re.I)
    if not matched:
        return url

    query_string = matched.group()
    it = re.finditer(r'&?(\w+)=.+?', url, re.M | re.I)
    
    for matched in it:
        var_name = matched.groups()[0]
        first_matched_idx = url.find(var_name + '=')
        
        if first_matched_idx < matched.start() or var_name in params_to_strip:
            continue

        query_string += matched.group()

    return query_string
```

## Other Solutions

### JavaScript 

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

### Python

```python
def strip_url_params(url, param_to_strip=[]):
    if '?' not in url:
        return url
    
    queries = (url.split('?')[1]).split('&')
    queries_obj = [query[0] for query in queries]
    for i in range(len(queries_obj) - 1, 0, -1):
        if queries_obj[i] in param_to_strip or queries_obj[i] in queries_obj[0:i]:
            queries.pop(i)

    return url.split('?')[0] + '?' + '&'.join(queries)
```