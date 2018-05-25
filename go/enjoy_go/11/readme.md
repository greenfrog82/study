# 11주차 스터디 

* UNIT 56. TCP 프로토콜 사용하기 
* UNIT 57. PRC 프로토콜 사용하기
* UNIT 58. HTTP 서버 사용하기 
* UNIT 59. 명령줄 옵션 사용하기 
* UNIT 60. 에러 처리하기 
* UNIT 61. 단위 테스트 사용하기 


## UNIT 56. TCP 프로토콜 사용하기

* 일반적으로 Socket 프로그래밍 하는 방법과 동일.
* 문득 현대에 이러한 RAW Level의 코딩을 할 일이 있나 싶음. 책에서와 같이 Game Programming과 같이 극한의 성능을 고려해야하는 경우 생각해볼 수 있을 듯.

## UNIT 57. RPC 프로토콜 사용하기 

* 실직적으로 현업에서 RPC를 사용하는 경우가 있는지?
* 일반적으로 TCP로 데이터를 전달할 때 구조체를 바이트 단위로 쪼개서 전달해야하는 등 귀찮은 문제가 있는데 이러한 문제가 없고 함수 콜이기 때문에 편리해보이는데 현업에서 사용하는 경우를 보지 못한듯.
* gRPC와 같이 HTTP/2 기반으로 다시 RPC가 여러 밴더에서 사용되어 지고 있는것 같기는 함.

## UNIT 58. HTTP 서버 사용하기 

* Node.js의 경우 기본 내장 HTTP 서버를 통해 개발부터 운영까지 모두 수행. 
* Go의 HTTP 서버 구현이 쉽고 go-routine의 성능이 일반적으로 Thread보다 경량화되어 있어 더 많은 수의 go-routine을 실행시킬 수 있는 점으로 미루어보아 HTTP 서버 없이(Cache, load-balancing, vhost 등의 HTTP 서버의 별도 기능이 필요없는 경우) Go만으로 웹 서비스 가능해 보임.   
따라서 관련 내용 확인해 보니 다음과 같은 내용이 있음.   
[Benchmarking Nginx with Go](https://gist.github.com/hgfischer/7965620)  
내용을 요약하면 Go의 HTTP 서버가 더 많은 트랙픽을 처리, 단 웹 서버가 필요한경우 CGI를 사용하지 않고 Proxy를 통해 Go와 직접 통신하는 것이 더 빠름. 
따라서 관련 내용의 숙지 필요해보임. 
* 검색해보니 golang으로 개발 된 웹서버는 없는 것 같음. 하지만 Reserver Proxy를 해주는 툴들은 존재.
* virtual host 역시 MultiPlexer를 통해 구현 가능 따라서 웹 서버는 딱히 필요 없어보임. 
[How to get “virtualhost” functionality in Go?](https://stackoverflow.com/questions/14170799/how-to-get-virtualhost-functionality-in-go?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)
* http.NewServeMux()의 역할을 정확히 모르겠고, 책에서는 DefaultServeMux와 동일하다고 해서 관련 내용을 찾아봤으나 정확한 내용 파악이 어려움. 일단 http.NewServeMux()는 개발자가 개발한 http.ServeMux를 반환한다고 함.  
[What is an http request multiplexer?](https://stackoverflow.com/questions/40478027/what-is-an-http-request-multiplexer?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)
* Go run 으로 서버 실행 시키고 Ctrl+C로 죽여도 데몬으로 살아있음. 종료 시그널 사용해서 종료해주어야함. 


## UNIT 59. 명령줄 옵션 사용하기 

* 명령줄 옵션 기능을 굉장히 강력한 방법으로 지원.
* 콘솔 툴 개발 시 굉장히 용이할 듯. 

## UNIT 60. 에러 처리하기 

* log.Fatal의 경우 고전적인 방법과 종료를 포함하는 이러한 방식을 함께 사용할 수 있으면 더 좋을듯. 해당 함수 호출 시 서비스를 종료시켜 버리는 것은 위험해 보인다.  
* 따라서 실제 서비스를 개발할 때는 사용하지 못할 것 같다. 
* Custom Error 역시 error interface의 Error 메소드를 구현하는 방식.

## Reference

* [Understanding Go Standard Http Libraries : ServeMux, Handler, Handle and HandleFunc](https://rickyanto.com/understanding-go-standard-http-libraries-servemux-handler-handle-and-handlefunc/)
