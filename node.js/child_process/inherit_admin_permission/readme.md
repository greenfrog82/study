# child_process 모듈의 spawn과 exec 함수가 부모 프로세스의 관리자 권한을 상속 받는가?

## 개요

[child_process](https://nodejs.org/api/child_process.html) 모듈의 spawn과 exec 함수가 부모 프로세스의 관리자 권한을 상속받는지 확인해보았다.

## 테스트

각각 spawn과 exec함수를 통해 생성 된 차일드 프로세스에서 관리자 권한이 상속되어야만 실행이 될 수 있는 코드를 실행시킨다. 이를 위한 테스트 코드로는 C 드라이브에 g_test.txt라는 파일을 쓰도록 할 것이다.

## 결과

각각 spawn과 exec함수 모두 별도 옵션 설정없이 부모 프로세스의 관리자 권한을 상속받아 의도한데로 동작한다. 

## 참조

* [child_process](https://nodejs.org/api/child_process.html)
