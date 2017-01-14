# alias 설정하는 방법

## alias에 대해서

리눅스에서 특정 명령의 별칭을 줄 수 있다. 이를 통해서 복잡한 명령을 짧게 또는 가독성 있게 만들어 줄 수 있다. 예를들어, 다음과 같이 디렉토리의 리스트를 출력하는 명령을 사용하면 번거롭다.

> ls -l

이를 다음과 같이 줄여서 사용하고 싶을 때 alias를 사용한다.

> ll

## 설정하기

> vi ~/.bashrc

위 명령을 통해 홈디렉토리의 .bashrc파일을 열고 적당한 위치에 다음과 같이 입력하면 된다.

```bash
alias ll='ls -l'
```

변경 내용을 저장한 후 terminal에서 다음 명령을 통해 편집한 홈디렉토리의 .bashrc파일을 적용하면 된다.

> . ~/.bashrc

## 테스트 환경

> Unbuntu 14.04

## 참조

* [How do I create a permanent Bash alias?](http://askubuntu.com/questions/17536/how-do-i-create-a-permanent-bash-alias)
