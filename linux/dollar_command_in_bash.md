# $()명령에 대해서 

docker를 공부하다보면 현재 실행 중인 모든 container를 중지하기 위해서 다음과 같은 명령을 사용하는 경우가 있다.

```bash
$ docker stop $(docker ps -q)
```

이때 $() 명령은 무엇일까? 이에 대해서 알아보자.

$()는 간단히 DB에 비유하자면, sub-query와 같은 것이다. $()명령은 sub-shell을 실행시키는 명령어이다. 

앞서 언급했던 docker를 예를들면, $(docker ps -q)를 통해 현재 실행 중인 container의 ID 목록을 읽어와서 $docker stop 명령의 인자로 전달하는 것이다. 

$()는 내부에 다시 $()를 호출할 수 있다.

## 참조

* [What is $() in a command](http://unix.stackexchange.com/questions/147420/what-is-in-a-command)


