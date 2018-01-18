# About Chosen Library

Chosen은 표준 Select 태그를 기능을 좀 더 사용자 친화적으로 수정해주는 jQuery Library이다. 
다양한 사용법에 대해서는 Chosen Library의 [index.html](./src/lib/index.html)파일을 참조하도록 하고 여기서는 Chosen의 성능 이슈도 확인해보겸 [Uncaught RangeError: maximum call stack size exceeded](https://github.com/greenfrog82/study/blob/master/front-end/jQuery/uncaught_rangeerror_max_call_stack_size_exceeded/reame.md)의 예제를 Chosen으로 바꿔보도록 하자. 

#### Requirement

* Ubuntu Linux version 14.04
* Mac macOS High Sierra 10.13.1 (17B1003)
    * Docker for mac 
    * Docker CE 17.09.1-ce-mac42 (21090)
* Chrome ver 63.0.3239.132
* jQuery ver 3.2.1
* Chosen ver 1.8.2

## How to apply the Chosen

Chosen을 적용하는것은 아주 간단하다. 일반적으로 select 태그를 사용하는 방법대로 코딩을 한 후 적용하고 싶은 select 태그를 찾아서 chosen() 메소드를 호출해주면 된다. 

다음 예제를 보자. select 태그를 찾은 chosen() 메소드를 호출해서 Chosen 라이브러리를 적용하였다. 

```html
<htaml>
<head>
<script>    
$(document).ready(function(){
    var options = '';
    for(var i=0; i<80000; i++) {
        options += '<option value="'+i+'">'+i+'</option>'        
    }   
    var selector = $(".chosen-select")
    selector.append(options); 
    $(".chosen-select").chosen();
});
</script>
</head>
<body>
    <select class="chosen-select">
    </select>
</body>
</html>
```

## How to update the Chosen

이제, [example : Uncaught RangeError : max call stack size exceeded](https://github.com/greenfrog82/study/blob/master/front-end/jQuery/uncaught_rangeerror_max_call_stack_size_exceeded/src/jquery_test.html)의 clear 기능을 구현해보자. 

```html
<html>
<head>
<script>
$(document).ready(function(){
    var options = '';
    for(var i=0; i<80000; i++) {
        options += '<option value="'+i+'">'+i+'</option>'        
    }   
    var selector = $(".chosen-select")
    selector.append(options); 
    var _chosen = $(".chosen-select").chosen();

    $("button").click(function() {               
        selector.empty('option');
    });
});

</script>
</head>
<body>
    <button>Clear</button>
    <select class="chosen-select">
    </select>
</body>
</html>
```
 
위 예제를 실행 한 후 'Clear'버튼을 아무리 눌러봐도 Chosen의 데이터가 삭제되지 않는다. Chosen이 적용된 후 변경된 데이터를 적용하기 위해서는 trigger 메소드를 통해 "chosen:updated" 이벤트를 호출해주어야한다. 해당 이벤트가 호출되면 Chosen은 변경된 데이터를 기준으로 리빌드된다. 

위 예제를 정상적으로 적용하기 위해서는 버튼의 클릭 이벤트를 다음과 같이 수정해야한다. 

```javascript
$("button").click(function()) {
    selector.empty('option');
    _chosen.trigger('chosen:updated'); 
}
```

## How to allow search feature starting from anywhere within word

Chosen을 default로 생성하면 목록을 검색할 때 반드시 단어의 처음 문자부터 검색을 시도한다. 
예를들어 목록에 'Seoul', 'LA', 'Wasington', 'London'와 같은 단어들이 있고 검색 차에서 'o'를 입력하면 아무것도 검색이 되지 않는다. 
이는 Chosen의 기본 설정이다. [Option of Chosen](https://harvesthq.github.io/chosen/options)의 'search_contains'에 대한 내용을 보자. 다음과 같다.  

>search_contains  
>default:false  
>
>By default, Chosen’s search matches starting at the beginning of a word. Setting this option to true allows matches starting from anywhere within a word. This is especially useful for options that include a lot of special characters or phrases in ()s and []s.

따라서, 단어의 중간에서도 검색을 허용하게 하기 위해서는 Chosen 객체를 생서할 때 search_contains 옵션을 true로 설정해주어야한다. 

```javascript
$(".chosen-select").chosen({ search_contains:true });
```

## Note

일반적으로 select 태그를 사용했을 때의 예제인 [example : Uncaught RangeError : max call stack size exceeded](https://github.com/greenfrog82/study/blob/master/front-end/jQuery/uncaught_rangeerror_max_call_stack_size_exceeded/src/jquery_test.html)와 비교했을 때 성능상 차이는 없는 것을 확인하였다. 

## Reference 

* [Chosen](https://harvesthq.github.io/chosen/)