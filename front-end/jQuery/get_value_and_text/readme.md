# val() method

val() method는 선택 된 elements의 value attribute의 값을 반환하거나 설정을 한다.

## get

val() method가 값을 얻어오는 용도로 사용될 때는 첫번째로 일치되는 element의 value attribute의 값을 반환한다.

## set

val() method가 값을 설정하는 용도로 사용될 때는 일치되는 모든 elements의 value attribute의 값을 설정한다.

## 예제

다음 예제를 통해서 앞서 get, set에서 언급했던 내용을 확인할 수 있다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Example</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script>
    $(function() {
      $('#getter').click(function() {
        var name = $('input:text').val();
        alert('[getter] name is ' + name);
      });
      $('#setter').click(function() {
        $('input:text').val('Are all input tags using type text really changed?');
      });
    });
  </script>
</head>
<body>
  <form>
    <input type='text' name='name' value='greenfrog' /><br />
    <input type='text' name='job' value='programmer' /><br />
    <input type='button' id='getter' value='get' />
    <input type='button' id='setter' value='set' />
  </form>
</body>
</html>
```

## 주의

val() method는 대부분 form elements과 함께 사용된다.

## 참조

* [jQuery val() Method](https://www.w3schools.com/jquery/html_val.asp)
