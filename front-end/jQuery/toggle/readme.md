# toggle 메소드에 대해서

## 개발 환경

* Ubuntu 16.04.1 LTS
* PyCharm 2016.3.2
* jQuery 3.1.1

## 개요

toggle 메소드는 간단히 이야기하면 특정 HTML 엘리먼트를 보이게 하거나 감추는 역할을 한다.

다음은 [.toggle()](http://api.jquery.com/toggle)의 공식 문서에서 발췌한 내용이다.

>The matched elements will be revealed or hidden immediately, with no animation, by changing the CSS display property. If the element is initially displayed, it will be hidden; if hidden, it will be shown. The display property is saved and restored as needed. If an element has a display value of inline, then is hidden and shown, it will once again be displayed inline.

## 예제

다음 예제는 .class_change라는 클래스명을 두 버튼을 번갈아가면서 화면에 출력한다.

```html
<script>
    $(function() {
        $('#id_click').click(function(e){
            $('.class_change').toggle(1000, function() {
                console.log('click');
            });
        });

        $('#id_progress').click(function(e) {
            $('.class_change').toggle(1000, function() {
                console.log('progress');
            });
        });
    });
</script>

<body>
    <form>
        <div style="margin: 10px 0 0 20px;">
            <input type="button" id="id_click" class="class_change button" value="Click" />
            <button type="button" id="id_progress" class="class_change button" style="display:none">
                <img src="./pre-loader.gif" />
            </button>
        </div>
    </form>
</body>
```

## 참조

* [.toggle()](http://api.jquery.com/toggle)
