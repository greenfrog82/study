# [jQuery.noConflict()](https://api.jquery.com/jquery.noconflict/)

일반적으로 jQuery 라이브러리에 접근할때는 `$` 키워드를 통하지만, `jQuery.noConflict()`는 `$`을 통해 jQuery 라이브러리에 접근하는 것을 막는다.  
이런 기능이 필요한 이유는 jQuery 이외에도 `$` 키워드를 사용하는 서드파티 라이브러리들이 많기 때문이다.  

## Why we need noConflict function?

`jQuery`에서 `$` 키워드는 단지 `jQuery` 키워드의 레퍼런스 변수이기 떄문에 그냥 `$` 키워드를 사용하지 않고 `jQuery` 키워드를 사용하면 될 것 같은데 이런 함수를 제공하는 이유가 뭘까?

우선, 다음과 같이 `$` 변수에 100을 우선 할당 한 후 jQuery 라이브러리를 import해보자.
`$` 변수에 100을 할당했다 하더라도 jQuery 라이브러리가 이후에 import되면서 `$` 변수 jQuery를 재할당하기 때문에 `$` 변수를 통해서 여전히 jQuery 라이브러리에 접근이 가능하다. 

[example_1.html](./example_1.html)
```html
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
    <script>
        var $ = 100;
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script>
        $( document ).ready(function() {
            $('p').hide();
        });
        console.log($);
    </script>
</head>
<body>
    <p>test</p>
</body>
</html>
```

하지만, 위와 같이 함에 따라 원래 `$` 변수에 100이라는 수를 할당하여 사용하고자 했던 의도와는 달리 여전히 `$`를 통해 jQuery 라이브리러를 접근하고 있다. 
이 문제를 해결하기 위해서 `noConflict()` 함수를 호출해주고 `$`를 통해 jQuery 라이브러리에 접근하던 코드를 `jQuery` 변수를 통해 접근하도록 수정해주어야한다.

[example_2](./example_2.html)
```html
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
    <script>
        var $ = 100;;
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script>
        jQuery.noConflict();
        jQuery( document ).ready(function() {
            jQuery('p').hide();
        });
        console.log($)
    </script>
</head>
<body>
    <p>test</p>
</body>
</html>
```

`noConflit()` 함수를 통해 위와 같은 동작이 가능한 이유는 jQuery가 임시변수에 `$`변수에 저장된 값을 본관하고 있다가 해당 함수가 호출 될 때 `$` 변수에 임시 변수에 저장해두었던 값을 할당하기 때문이다.
`noConflit()` 함수의 코드는 대강 다음과 같다. 

[noConflict code snippet](./test_no_conflict.js)
```javascript
e = {}

e.$ = 100;
e.jQuery = 500;

function perform() {
    var Jt = e.jQuery
    , Kt = e.$;

    var w = 'jQuery'
    e.jQuery = e.$ = w
    return w.noConflict = function(t) {
        return e.$ === w && (e.$ = Kt),
        t && e.jQuery === w && (e.jQuery = Jt),
        w
    }
}

// console.log(perform());
console.log(perform()())
console.log(e)
// console.log(perform()(true))
// console.log(e)
```

물론, 라이브러리의 import 순서를 잘 조정해서 jQuery를 가장 먼저 import하면 `noConflict()` 함수의 호출은 필요없다.   

[example_3](./example_3.html)
```html
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script>
        var $ = 100;;
        jQuery( document ).ready(function() {
            jQuery('p').hide();
        });
        console.log($)
    </script>
</head>
<body>
    <p>test</p>
</body>
</html>
```

한가지 더, `noConflict()` 함수는 jQuery 라이브러리의 레퍼런스를 반환하기 때문에 이를 받아서 사용할 수도 있다.  
다음 예제를 보자. 

[example_4](./example_4.html)
```html
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
    <script>
        var $ = 100;;
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script>
        jq = jQuery.noConflict();
        jq( document ).ready(function() {
            jq('p').hide();
        });
        console.log($)
    </script>
</head>
<body>
    <p>test</p>
</body>
</html>
```

## How to use $ with other library which use $ too

`noConflict()`를 통해 다른 서드파티 라이브러리가 `$`를 사용할 수 있도록 했지만, `$`를 그대로 사용하고 싶을 수 있다. 이러한 경우 `.ready()`의 callback 함수 파라메터명으로 `$`을 전달하면 된다.  

[example_5](./example_5.html)
```html
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
    <script>
        var $ = 100;;
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script>
        jQuery.noConflict();
        jQuery( document ).ready(function($) {
            $('p').hide();
        });
        console.log($)
    </script>
</head>
<body>
    <p>test</p>
</body>
</html>
```

## When do we pass true parameter to jQuery.noConflict function?

`noConflict()` 함수는 Boolean 타입의 파라메터를 전달할 수 있다. 일반적으로는 아무것도 전달하지 않지만, 서로 다른 jQuery 라이브러리를 사용하는 경우 필요하다.  
사실, 이와 같이 서로 다른 jQuery 라이브러리 하나의 페이지에서 함께 사용한다는 것은 좋은 방법이 아니지만 일단 공식 문서에서는 소개하고 있으니 알아보고는 가자.  

[example_6](./example_6.html)
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>jQuery.noConflict demo</title>
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>
    <div id="log">
        <h3>Before $.noConflict(true)</h3>
    </div>
    <script src="https://code.jquery.com/jquery-1.6.2.js"></script>
    <script>
        var $log = $("#log");

        $log.append("2nd loaded jQuery version ($): " + $.fn.jquery + "<br>");

        // Restore globally scoped jQuery variables to the first version loaded
        // (the newer version)

        jq162 = jQuery.noConflict(true);

        $log.append("<h3>After $.noConflict(true)</h3>");
        $log.append("1st loaded jQuery version ($): " + $.fn.jquery + "<br>");
        $log.append("2nd loaded jQuery version (jq162): " + jq162.fn.jquery + "<br>");
    </script>
</body>
</html>
```

# Reference

* [[JQuery] 다른 라이브러리로부터 jQuery 보호하기](http://yubylab.tistory.com/entry/%EB%8B%A4%EB%A5%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A1%9C%EB%B6%80%ED%84%B0-jQuery-%EB%B3%B4%ED%98%B8%ED%95%98%EA%B8%B0)
