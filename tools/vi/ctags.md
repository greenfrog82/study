# ctags

vi 에디터에서 소스코드를 작성할 때 함수 또는 변수등을 추적하기 위한 index를 제공하는 유틸리티

## Installation

```bash
$ sudo apt-get install exuberant-ctags
```

## How to use

소스코드가 있는 프로젝트에서 다음 명령을 통해 tags(index 파일)을 만든다. 

```bash
$ ctags -R
```

tags파일이 생성되면 특정 파일을 vi 에디터로 오픈한다. 
그리고 다음에 나열 된 기능을 사용하면 된다.

* Go to define : Ctrl + ]
* Back to use  : Ctrl + t


## Reference

* [ctags 사용법](http://bowbowbow.tistory.com/15)
