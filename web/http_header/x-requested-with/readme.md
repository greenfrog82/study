# What is the X-Requested-With header?

## Necessity for X-Requested-With header 

보안을 위해서 사용된다.   
이 헤더는 **CORS**를 지원하지 않는 서버에서는 추가될 수 없기 때문에 **CSRF** 공격을 방어 할 수 있다.  

만약, 서버에서 Reqeust Header를 확인하여 **X-Requested-With**헤더가 존재한다며, 이것은 해커에 의해 생성된 요청이 아님을 알 수 있다.  
또한, 이 헤더를 통해 해당 요청이 HTML Form에서 전달되지 않은 것을 구분할 수 있다.  

## Reference

* [What's the point of the X-Requested-With header?
](https://stackoverflow.com/questions/17478731/whats-the-point-of-the-x-requested-with-header?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)