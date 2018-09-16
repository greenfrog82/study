# How to use command line parameters with alias

리눅스나 맥을 사용하다보면 반복적인 명령을 작성하기 귀찮아서 **alias**를 자주 사용하게 된다.  
얼마전에 회사에서 굉장히 긴 명령을 자주 사용할 일이 생겼다.  
하지만 이번 **alias**는 기존과 좀 달랐었는데 명령 실행 시 command line parameter를 전달 할 수 있어야했다.  
따라서 **alias**에 command line parameter를 전달할 수 있는 방법을 찾아보았다.  

**결론부터 이야기하면, alias에 command line parameter를 전달 할 수 있는 방법은 없다.** 

이러한 경우는 function을 만들어서 사용해야한다.  

## How to write function using command line parameter 

그러면 command line parameter를 사용하는 function을 만들어보자. 

[ex_1.sh](./ex_1.sh)
```bash
#!/bin/bash

perform() {
    echo 'This is first command line parameter : ' $1
    echo 'This is second command line parameter : ' $2
}

perform $1 $2
```

$1으로 첫번째 command line parameter가 그리고 $2로 두번째 command line parameter가 전달된다.   

다음은 실행 결과이다. 

```bash
$ ./ex_1.sh 1 2
This is first command line parameter :  1
This is second command line parameter :  2
```

참고로 $0으로는 현재 실행 중인 shell script name이 전달된다. 

## What is the $@?

command line parameter를 핸들링 할 수 있는 **$@**를 추가적으로 알아보자. 
**$@**는shell script로 전달되는 모든 command line parameter들을 shell script로 전달한다.  

```bash
#!/bin/bash

perform() {
    echo 'This is command line parameters :' $@
}

perform $@
```

다음은 실행 결과이다.  

```bash
$ ./ex_2.sh 1 2 3 4 5
This is command line parameters : 1 2 3 4 5
```

앞서 실행 결과를 통해 눈치챘겠지만, **$@**는 shell script를 제외한 command line parameter만 전달한다. 

## Using together $@ and $1, $2, $3 ... n

command line parameter를 다루기 위한 두 가지 타입의 변수를 함께 사용할수도 있다.  

```bash
#!/bin/bash

perform() {
    echo 'This is first command line parameter :' $1
    echo 'This is second command line parameter :' $2
    echo 'These are all command line parameters :' $@
}

perform $@
```

실행 결과는 다음과 같다.  

```bash
$ ./ex_3.sh 1 2
This is first command line parameter : 1
This is second command line parameter : 2
These are all command line parameters : 1 2
```

## Reference

* [Make a Bash alias that takes a parameter?](https://stackoverflow.com/questions/7131670/make-a-bash-alias-that-takes-a-parameter)
* [What does $@ mean in a shell script?](https://stackoverflow.com/questions/9994295/what-does-mean-in-a-shell-script)
