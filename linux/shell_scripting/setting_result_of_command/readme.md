# Setting value which is result executing shell command into variable

셀 스크립트에서 shell command를 실행 시킨 후 실행 결과를 변수에 할당하는 2가지 방법에 대해서 알아본다. 

## Using `command`

**``**을 사용해서 shell command를 실행 시킨 후 출력 결과를 변수에 할당할 수 있다.  

다음 예제를 보자.  
ls -l 명령을 통해 현재 경로의 파일 구조를 출력한 결과를 이를 RES_DIR 변수에 담기 위해 해당 명령을 ``로 감쌓다. 

```sh
#!/bin/sh

RES_DIR=`ls -l`
echo $RES_DIR
```

## Using $(command) 

**$()**을 사용해서 shell command를 실행 시킨 후 출력 결과를 변수에 할당할 수 있다.  

다음 예제를 보자.
앞서 **Using ``**와 동일할게 ls-l 명령을 $()으로 감쌓다. 

```sh
#!/bin/sh

RES_DIR=$(ls -l)
echo $RES_DIR
```

## Conclusion

사실 앞서 사용한 문법은 command 라인 명령을 작성하면서 많이 보았을 것이다. 바로 sub command를 실행시키는 방법이다. 이와같이, 쉘 스크립트를 작성할 때 sub command를 실행시키는 방법을 통해서 변수에 출력 결과를 할당하거나 중첩 된 sub command를 실행시킬 수 있다. 


