# URL Encoding

`URL`은 오직 `ASCII 문자셋`만을 인터넷으로 전달 할 수 있다. 때문에 `URL`에 `ASCII 문자셋`이외의 문자가 포함 된 경우 반드시 유효한 `ASCII 문자셋`으로 치환해주어야한다. 이를 `URL Encoding`이라고한다.  

`URL Encoding`은 **ASCII 문자셋에 포함되지 않은 문자**를  **'%'문자 뒤를 잇는 두개의 16진수 숫자**로 치환한다. `URL`은 **공백을 포함할 수 없다.** 따라서 공백을 `+`문자 또는 `%20`로 치환한다. 

참고로, HTML5의 기본 인코딩 타입은 `UTF-8`이다. 

# Reference

* [HTML URL Encoding Reference](https://www.w3schools.com/tags/ref_urlencode.asp)