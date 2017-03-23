# vimdiff 간단 사용법

## 개요

vimdiff는 vim을 사용해서 두 파일(두 파일 이상을 비교할 수 있지만, 여기서는 두 파일에 대해서만 다룬다.)을 비교하고 병합하는 도구이다. 

## vimdiff 실행하기

다음 명령어를 통해 비교하고자 하는 두 파일을 로드한다. 

```bash
vimdiff <source 1> <source 2>
```

위 명령을 통해서 source_1파일과 source_2 파일을 비교해보자.

```bash
greenfrogui-MacBook-Pro:vimdiff greenfrog$ vimdiff source_1 source_2
```

위 명령을 사용하면 다음과 같이 vimdiff가 실행된다.

![vimdiff source_1 source_2]()

## 명령어

vimdiff의 명령어를 사용할때는 vim과 동일하게 명령모드(esc)에서 사용하면 된다. 

**dp**

차이점이 있는 행에 커서를 두고 dp 명령을 사용하면 좌측창에 있는 내용을 우측창에 반영한다.

**do**

차이점이 있는 행에 커서를 두고 do 명령을 사용하면 우측창에 있는 내용을 좌측창에 반영한다.

**]c**

다음 차이점이 있는 행으로 이동한다.

**[c**

이전 차이점이 있는 행으로 이동한다. 

## 참조

* [How do I use vim as a diff tool?](http://vi.stackexchange.com/questions/625/how-do-i-use-vim-as-a-diff-tool)


