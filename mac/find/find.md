# find command

`find command`의 사용법에 대해서 알아보자.  

## -type

특정 타입의 파일을 찾는다.   
찾을 수 있는 타입의 종류는 다음과 같다. 

* b : 블록 특수 파일(block device)
* c : 캐릭터 특수 파일 (character deice)
* d : 디렉토리(directory)
* f : 일반파일(file)
* l : 심볼릭 링크(link)
* p : 파이프 (pipe)
* s : 소켓 (socket)

### Example 

다음과 같은 파일경로가 있다고 가정하자. 

```bash
~/sample $ tree
.
├── sample
└── sample_ -> sample/sample
```

여기서 `sample`로 시작하는 파일(파일, 디렉토리, 심볼릭 링크)을 모두 찾아보자. 

```bash
$ find . -name "sample*"
./sample
./sample/sample_
./sample/sample$
```

이제 여기서 `-type`옵션을 통해 원하는 형식의 파일만을 찾아보자.  

```bash
~/sample $ find . -type f -name "sample*" # sample로 시작하는 파일을 찾는다.
./sample/sample
~/sample $ find . -type l -name "sample*" # sample로 시작하는 심볼릭 링크를 찾는다.
./sample/sample_
~/sample $ find . -type d -name "sample*" # sample로 시작하는 디렉토리를 찾는다. 
./sample
```

# Reference

* [[펌] UNIX find 명령어 사용방법](http://seein7.tistory.com/entry/%ED%8E%8C-UNIX-find-%EB%AA%85%EB%A0%B9%EC%96%B4-%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95)