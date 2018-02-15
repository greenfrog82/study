# jQuery의 detach method에 대해서

detach method는 **삭제되는 element에 할당 된 jQuery instance를 유지한다는 것을 제외하면** remove method와 동일하다.  
detach method는 삭제된 element들이 다시 추가 될 때 유용하다.

다음 예제는 p 엘리멘트를 detach 한 후 다시 DOM에 추가하는 예제인데, detach될 때 p 엘리멘트가 가지고 있던 속성들을 변수 p가 그대로 보전하고 있다가 DOM에 다시 추가하는 것을 확인 할 수 있다. 

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>detach demo</title>
  <style>
  p {
    background: yellow;
    margin: 6px 0;
  }
  p.off {
    background: black;
  }
  </style>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script>
    $(document).ready(function() {
      $( "p" ).click(function() {
        $(this).toggleClass("off");
      });
      var p;
      $( "button" ).click(function() {
        if (p) {
          p.appendTo("body");
          p = null;
        } else {
          p = $("p").detach();
          console.log(p);
        }
      });
    });
  </script>
</head>
<body>
  <p>Hello</p>
  how are
  <p>you?</p>
  <button>Attach/detach paragraphs</button>
</body>
</html>
```

## Reference

* [.detach()](https://api.jquery.com/detach/)