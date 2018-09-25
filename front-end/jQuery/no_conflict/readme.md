# [jQuery.noConflict()](https://api.jquery.com/jquery.noconflict/)

일반적으로 jQuery 라이브러리에 접근할때는 `$` 키워드를 통하지만, `jQuery.noConflict()`는 `$`을 통해 jQuery 라이브러리에 접근하는 것을 막는다. 

>jQuery.noConflict([removeAll])
>**removeAll**
>Type:Boolean
>

많은 자바스크립트 라이브러리들이 `$`을 함수 또는 변수의 이름으로 사용한다. 만약, `$`를 함수 또는 변수로 사용하는 자바스크립트 라이브러리와 jQuery를 함께 사용한다면, `$.noConflict()`을 호출해서 `$`를 다른 라이브러리가 사용하도록 할 수 있다.  

# Reference

*[[JQuery] 다른 라이브러리로부터 jQuery 보호하기](http://yubylab.tistory.com/entry/%EB%8B%A4%EB%A5%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A1%9C%EB%B6%80%ED%84%B0-jQuery-%EB%B3%B4%ED%98%B8%ED%95%98%EA%B8%B0)