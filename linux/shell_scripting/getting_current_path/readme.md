# How to get directory where shell script is executing

프로그램을 작성하다 보면 참조되는 파일들을 상대경로로 관리하기 위해서 현재 실행 중이 Process의 경로를 알아야하는 경우가 빈번하다. 
이와같이 쉘 스크립트를 작성할 때 현재 쉘 스크립트가 실행되고 있는 경로를 얻어오는 방법에 대해서 알아본다. 

## Using PWD

쉘 스크립트는 쉘이 제공하는 command를 바로 실행하기 때문에 어렵게 생각할 필요없이 'PWD' command를 이용하면 쉽게 현재 쉘 스크립트가 실행되는 경로를 찾을 수 있다. 

```sh
#!/bin/sh

CURR_DIR=`pwd`
echo $CURR_DIR
```

## Reference

* [How can I get the current working directory? [duplicate]](https://unix.stackexchange.com/questions/188182/how-can-i-get-the-current-working-directory)