# What is question mark with filename in html

코드를 읽다가 다음과 같이 static file명 옆에 '?'와 함께 날짜가 있는 코드를 보았다. 

```html
<script type="text/javascript" src="/static/app/shared/common/core/js/xonomy.js?2017-02-06"></script>
	<link type="text/css" rel="stylesheet" href="/static/app/shared/common/core/js/xonomy.css?2017-02-06"/>
```

static file을 요청하면서 Query String을 전달하고 있는데 이게 어떤 의미인지 알 수 없어서 확인해보았더니 다음과 같은 글을 찾았다. 

>Its a url param like any other parameter passed in a url. Sometimes JS scripts are created on the fly using server side technologies other times it is simply a version number to help with browser caching issues.

결국, Cache Buster를 위한 트릭이라는 것인데, React나 Vue의 경우 이를 위해서 static file을 빌드할 때 파일명 뒤에 time-stamp같은 것을 붙여주는데 이와 같은 역할을 한다는 것이다.  

이를 확인하기 위해 간단히 예제코드를 작성하였다.  
다음과 같이 app.js를 요청하는 index.html을 작성하고 Node.js를 통해 다음과 같이 index.html을 응답하는 코드를 작성하였다. 

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
    <script src="/app.js"></script>
    <script src="/manage.py"></script>
</head>
<body>
    
</body>
</html>
```

```javascript
const express = require('express')
const path = require('path')
const app = express()

const clientPath = '/develop/html_css/what_is_the_question_mark_with_filename/src/';

app.use('/', express.static(clientPath));
app.get(
    '/', 
    (req, res) => {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
);

app.listen(8080, () => console.log('Example app listening on port 8080!'))
```

이를 통해 최초 요청 시 200응답을 받았고, 두번째 응답시는 캐쉬가 되어 304를 응답하는 것을 확인하였다.  
이때, 다음과 같이 app.js를 app.js?1로 수정한 후 정한 후 재요청했을 때 다른 static file은 304를 응답했지만 app.js는 app.js 자체의 수정사항이 없음에도 불구하고 200응답을 받는 것을 확인하였다. 

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
    <script src="/app.js?3"></script>
    <script src="/manage.py"></script>
</head>
<body>
    
</body>
</html>
```

## Conclusion

static file 이름에 ?와 함께 버전명등을 전달하는 방법으로 Cache Buster를 유도할 수 있다. 

## Reference

* [What does “?”, used after JavaScript filename, means?
](https://stackoverflow.com/questions/4044085/what-does-used-after-javascript-filename-means)