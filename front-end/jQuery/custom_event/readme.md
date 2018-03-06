# About custom event

#### Requirement

* jQuery 3.1.1 

[Introducing Custom Events](https://learn.jquery.com/events/introduction-to-custom-events/)에도 밝혔듯이 우리는 DOM Event에 익숙하다. 따라서 Custom Event라는 것이 낯설다.  

일반적으로 우리는 이벤트를 다룰 때, 이벤트를 발생시키는 element에 집중하게 된다. 하지만 Custom Event는 이벤트의 처리 대상이 되는 element에 집중한다.  
이를통해 다음과 같은 이점을 제공한다. 

1. 이벤트의 처리 대상이되는 element는 중복코드나 이러한 중복코드를 예방하기 위한 함수 없이 이벤트를 발생시키는 다른 elements를 통해 일관된 방식으로 호출될 수 있다. 
2. 이벤트들은 여러 비슷한 이벤트의 처리 대상이되는 elements에의해 한번에 호출될 수 있다. 
3. 이벤트 코드가 이벤트 처리대상이 되는 element에 Bind되어 있기 때문에 유지보수가 용이하다. 


## Problem

위 내용을 이해하기 쉽지 않다. 이를 이해하기 위해서 문제를 하나 해결해보는것이 도움이 될 것이다. 
부엌에 백열전구가 있고 이를 on/off하기 위한 switch가 있다. 이를 코드로 작성해보자. 

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>bind demo</title>
    <style>
        .on {
            color: red;
        }
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script>
        $(function () {
            $(".switch").click(function () {
                var light = $(this).closest(".room").find(".lightbulb");
                if (light.is(".on")) {
                    light.removeClass("on").addClass("off");
                } else {
                    light.removeClass("off").addClass("on");
                }
            });
        });
    </script>
</head>
<body>
    <div class="room" id="kitchen">
        <div class="lightbulb on">lightbulb</div>
        <div class="switch">switch</div>
    </div>
</body>
</html>
```

위 코드를 보면 switch element를 사용자가 클릭함에 따라 lightbulb element에 불을 on/off한다.  
따라서 지금까지의 상식으로는 switch element에 lightbulb element에 불을 on/off하기 위한 이벤트 코드를 작성할 것이다. 
위 코드 역시 이러한 방법으로 코드를 작성하였다. 

## Using custom event to resolve this problem





## Reference

* [Introducing Custom Events](https://learn.jquery.com/events/introduction-to-custom-events/)