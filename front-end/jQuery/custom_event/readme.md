# About Custom Event

#### Requirement

* jQuery 3.1.1 

[Introducing Custom Events](https://learn.jquery.com/events/introduction-to-custom-events/)에도 밝혔듯이 우리는 DOM Event에 익숙하다. 따라서 커스텀 이벤트라는 것이 낯설다.  

일반적으로 우리는 이벤트를 다룰 때, 이벤트를 발생시키는 엘리먼트에 집중하게 된다. 하지만 커스텀 이벤트는 이벤트의 처리 대상이 되는 엘리먼트에 집중한다.  
이를통해 다음과 같은 이점을 제공한다. 

1. 이벤트의 처리 대상이되는 엘리먼트는 중복코드나 이러한 중복코드를 예방하기 위한 함수 없이 이벤트를 발생시키는 다른 엘리먼트s를 통해 일관된 방식으로 호출될 수 있다. 
2. 이벤트들은 여러 비슷한 이벤트의 처리 대상이되는 엘리먼트s에의해 한번에 호출될 수 있다. 
3. 이벤트 코드가 이벤트 처리대상이 되는 엘리먼트에 Bind되어 있기 때문에 유지보수가 용이하다. 


## Problem

위 내용을 이해하기 쉽지 않다. 이를 이해하기 위해서 문제를 하나 해결해보는것이 도움이 될 것이다. 
부엌에 백열전구가 있고 이를 켜고 끌수있는 스위치가 있다. 이를 코드로 작성해보자. 

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

위 코드를 보면 스위치를 사용자가 클릭함에 따라 백열전구에 불을 켜고 끈다. 
따라서 지금까지의 상식대로 백열전구에 불을 켜고 끄는 기능을 스위치 이벤트에 작성하였다. 

## Using custom to resolve this problem

커스텀 이벤트는 이벤트의 처리 대상이 되는 엘리먼트에 이벤트를 작성한다. 그리고 커스텀 이벤트로 등록 된 기능을 동작시키기 위한 엘리먼트에서 호출한다.  
그럼 위 문제를 커스텀 이벤트를 통해 풀어보자.  

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
            $(".lightbulb").on("light:toggle", function (event) {
                var light = $(this);
                if (light.is(".on")) {
                    light.removeClass("on").addClass("off");
                } else {
                    light.removeClass("off").addClass("on");  
                }
            });
 
            $(".switch").click(function () {
                var room = $(this).closest(".room");
                room.find(".lightbulb").trigger("light:toggle");
            });
        });
    </script>
</head>
<body>
    <div class="room" id="kitchen">
        <div class="lightbulb on">lightbulb - kitchen</div>
        <div class="switch">switch</div>
    </div>
</body>
</html>
```

앞선 예제와의 차이점이라면 백열전구에 불을 켜고 끄기위한 이벤트 코드가 스위치에서 백열전구로 이동한것을 알 수 있다.  
그리고 스위치는 백열전구를 켜고 끄기 위해 백열전구에 등록된 커스텀 이벤트를 호출한다. 
이 부분이 커스텀 이벤트의 핵심이라고 할 수 있다. 

잠시 코드를 잊고 실제 백열전구와 스위치가 있다고 가정해보자. 
이때, 불이 켜지고 꺼지는 기능은 백열전구가 가지고 있을 것이다. 그리고 스위치는 이 백열전구의 불일 켜고 끄는 기능을 작동시키는 역할만을 할 것이다. 
커스텀 이벤트는 이와 같이 현실과 동일한 방식으로 코드를 작성하게 함으로서 가독성을 높이고 유지보수를 쉽게 하도록 한다. 

그러면 이번에는 문제를 조금 더 확장하여 보자.  
부엌이외에 같은 구조의 침실을 하나 더하고 이 두 곳의 불을 한번에 켰다 끌수있는 마스터 스위치를 추가해보자. 

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
            $(".lightbulb").on("light:toggle", function (event) {
                var light = $(this);
                if (light.is(".on")) {
                    light.trigger("light:off");
                } else {
                    light.trigger("light.on");  
                }
            }).on("light:on", function(event) {
                $(this).removeClass("off").addClass("on");
            }).on("light:off", function(event) {
                $(this).removeClass("on").addClass("off");
            });
 
            $(".switch").click(function () {
                var room = $(this).closest(".room");
                room.find(".lightbulb").trigger("light:toggle");
            });

            $("#master_switch").click(function() {
                var lightbulbs = $(".lightbulb");

                // Check if any lightbulbs are on
                if (lightbulbs.is(".on")) {
                    lightbulbs.trigger("light:off");
                } else {
                    lightbulbs.trigger("light:on");
                }
            });
        });
    </script>
</head>
<body>
    <div class="room" id="kitchen">
        <div class="lightbulb on">lightbulb - kitchen</div>
        <div class="switch">switch</div>
    </div>
    <p>---------------------------</p>
    <div class="room" id="bedroom">
        <div class="lightbulb on">lightbulb - bedroom</div>
        <div class="switch">switch</div>
    </div>
    <p>---------------------------</p>
    <div id="master_switch">master switch</div>
</body>
</html>
```

마스터 스위치는 각 방의 불을 한번에 켜고 끌 수 있어야하고, 각 방의 스위치는 여전히 자신의 방에 있는 불만을 켜거나 끌 수 있어야한다.  
따라서, 백열전구에 토글 기능 이외에 토글 기능에 있던 불을 켜고 끄는 기능을 분리하여 커스텀 이벤트로 추가 등록했다. 그리고 각각에 스위치에서는 이 기능을 적절히 호출하도록 하였다. 

이번에는 위 코드를 커스텀 이벤트를 사용하지 않고 작성해보자. 

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
            function turnOn(light) {
                light.removeClass("off").addClass("on");
            }
            function turnOff(light) {
                light.removeClass("on").addClass("off");
            }
            function toggle(light) {
                if(light.is(".on")) {
                    turnOff(light);
                } else {
                    turnOn(light);
                }
            }
            
            $(".switch").click(function () {
                var room = $(this).closest(".room");
                toggle(room.find(".lightbulb"));
            });

            $("#master_switch").click(function() {
                var lightbulbs = $(".lightbulb");

                // Check if any lightbulbs are on
                if (lightbulbs.is(".on")) {
                    turnOff(lightbulbs);
                } else {
                    turnOn(lightbulbs);
                }
            });
        });
    </script>
</head>
<body>
    <div class="room" id="kitchen">
        <div class="lightbulb on">lightbulb - kitchen</div>
        <div class="switch">switch</div>
    </div>
    <p>---------------------------</p>
    <div class="room" id="bedroom">
        <div class="lightbulb on">lightbulb - bedroom</div>
        <div class="switch">switch</div>
    </div>
    <p>---------------------------</p>
    <div id="master_switch">master switch</div>
</body>
</html>
```

중복코드를 없애고자 각각의 기능을 함수로 분리하여 작성하고 나니 앞서 커스텀 이벤트를 사용했을 때와 크게 차이가 나보이지는 않는다. 따라서 커스텀 이벤트의 필요성을 잘 못느낄 수도 있다. 하지만 다시 생각해보면 위 방법은 중복코드를 없애고 코드의 재활용성을 이뤄내기는 했지만 매개변수를 잘못 전달한 경우 코드가 오작동 할 수 있고, lightbulb의 기능이 lightbulb 엘리먼트와 분리되어 있기 때문에 추후 관리해야하는 코드의 양이 많아진다면 코드의 가독성이 떨어져 유지보수가 어려워질 것이다.  

## Naming Custom Event

커스텀 이벤트의 이벤트명은 어떤 것이든지 사용할 수 있다. 하지만 한가지 주의해야하는것은 앞으로 새로 생성 될 DOM Event명과 중복되어서는 안된다는 것이다. 따라서, 앞선 예제에서는 **light:**와 같이 이벤트명에 콜론을 사용하였는데 DOM 스펙에는 이벤트명에 콜론을 붙이지 않기 때문이다. 

## Reference

* [Introducing 커스텀 이벤트s](https://learn.jquery.com/events/introduction-to-custom-events/)