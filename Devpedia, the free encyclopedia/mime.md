# [MIME](https://en.wikipedia.org/wiki/MIME)

_본 문서는 [MIME](https://en.wikipedia.org/wiki/MIME)에 대한 개념을 알기 위해 Wikipedia의 [MIME](https://en.wikipedia.org/wiki/MIME)를 번역한 것이다._

Multipurpose Internet Mail extensions(MIME)은 다음 내용을 지원하기 위한 E-Mail형식을 확장하는 인터넷 표준이다. 

* ASCII이외의 문자셋 지원
* 문자가 아닌 첨부파일 지원 (오디오, 비디오, 이미지, 어플리케이션 프로그램, 기타 등등)
* Multiple Parts를 이용한 메시지 바디 지원
* ASCII가 아닌 문자셋을 이용한 헤더 정보 지원

사실, 모든 사람이 작성한 인터넷 E-Mail과 굉장히 많은 양의 자동화 된 E-Mail은 MIME 형식을 이용하는 [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)를 통해서 전달된다.

[MIME](https://en.wikipedia.org/wiki/MIME)은 6개의 연결 된 RFC 메모에 명시되어 있다. (RFC 2045, RFC 2046, RFC 2047, RFC 4288, RFC 4289 and RFC 2049)
RFC 1521 and RFC 1522에는 SMTP 이메일과의 통합에 대한 내용이 자세히 명시되어있다. 

비록 [MIME](https://en.wikipedia.org/wiki/MIME)은 주로 [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)를 위해 디자인 되었지만, 
[MIME](https://en.wikipedia.org/wiki/MIME)에 정의 된 content-type은 WWW의 HTTP와 같이 E-Mail이외의 다른 커뮤니케이션 프로토콜에서 역시 중요하다.
서버는 웹 전송의 시작부분에 [MIME](https://en.wikipedia.org/wiki/MIME) 헤더를 삽입한다. 
클라이언트는 헤더가 가리키는 데이터의 타입을 처리 할 수 있는 적절한 Viewer 어플리케이션을 찾기 위해서 이 [content type](https://en.wikipedia.org/wiki/Media_type) 또는 [media type](https://en.wikipedia.org/wiki/Media_type) 헤더를 사용한다. 
이러한 Viewer들 중 일부는 웹 클라이언트 또는 브라우저에 내장되어있다. (예를들어, 대부분은 브라우저들은 GIF와 JPEG 이미지 뷰어를 내장하고 있을 뿐만아니라 HTML 파일들도 처리할 수 있다.)

> **역자주**
>
>위 번역에서 content type과 media type이라는 용어가 헷갈릴 수 있는데 WIKEPEDIA의 [Media type](https://en.wikipedia.org/wiki/Media_type) 글에 의하면 이 둘은 완전히 동일한 의미이다.
즉, 전송을 하기 위한 컨텐츠가 어떤 정보를 담고 있는지를 클라이언트에 전달하기 위한 용도로 사용되는 MIME header 정보 중 하나이다.

## 참조

* [MIME](https://en.wikipedia.org/wiki/MIME)
* [Media type](https://en.wikipedia.org/wiki/Media_type)