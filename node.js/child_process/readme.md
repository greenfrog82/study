# Difference between spawn and exec of Node.js child_process

__본 문서는 [Difference between spawn and exec of Node.js child_process](https://www.hacksparrow.com/difference-between-spawn-and-exec-of-node-js-child_process.html)을 번역하였다.__

Node.js의 Child Processes 모듈(<font style=color:#D55E53>child_process</font>)는 <font style=color:#D55E53>spawn</font>과 <font style=color:#D55E53>exec</font> 함수를 가지고 있다. 우리는 이 함수들을 통해 시스템에서 다른 프로그램을 실행하기 위한 차일드 프로세스를 생성할 수 있다. <font style=color:#D55E53>child_process</font>를 처음 다루는 경우 동일한 기능을 하는 함수가 왜 두개나 있는지 그리고 어떤 함수를 사용해야하는지 궁금할지도 모른다. 나는 여러분이 <font style=color:#D55E53>spawn</font>과 <font style=color:#D55E53>exec</font> 함수의 사용을 결정할 때 도움이 될 수 있도록 이들의 차이점을 설명하고자 한다.

<font style=color:#D55E53>spawn</font>과 <font style=color:#D55E53>exec</font> 함수의 가장 큰 차이점은 이들이 무엇을 반환하냐는 것이다. <font style=color:#D55E53>spawn</font>은 스트림을 반한하고, <font style=color:#D55E53>exec</font>는 버퍼를 반환한다.

<font style=color:#D55E53>spawn</font>은 <font style=color:#D55E53>stdout</font>과 <font style=color:#D55E53>stderr</font> 스트림을 가지고 있는 객체를 반환한다. 여러분은 <font style=color:#D55E53>stdout</font> 스트림을 이용해서 차일드 프로세스가 Node로 전달하는 데이터를 읽을 수 있다. <font style=color:#D55E53>stdout</font>은 'data', 'end' 그리고 다른 이벤트들도 가지고 있다. <font style=color:#D55E53>spawn</font>이 가장 적절히 사용 될 때는 차일드 프로세스가 Node로 많은 양의 데이터를 전달해야할 때이다. - 이미지 프로세싱, 바이너리 데이터 읽기 등.

<font style=color:#D55E53>spawn</font>은 '비동기적인 비동기'라고 하는데, 이는 차일드 프로세스가 실행되자마자 데이터를 전달하기 시작하는 것을 의미한다.

여러분은 [여기서](http://www.hacksparrow.com/using-node-js-to-download-files.html#nodejs-curl) 내가 Node로 전달되는 **curl** 요청의 결과를 읽기위해서 <font style=color:#D55E53>spawn</font>을 사용하는 것을 볼 수 있다.

<font style=color:#D55E53>exec</font>는 차일드 프로세스로부터 버퍼 전체를 반환한다. 기본 버퍼 크기는 200k로 설정되어 있다. 만약 차일드 프로세스가 기본으로 설정되어 있는 버퍼 크기를 넘은 무언가를 반환하려 한다면, 여러분의 프로그램은 "Error:maxBuffer exceeded".라는 에러메시지와 함께 오류를 발생시킬 것이다. 여러분은 <font style=color:#D55E53>exec</font>의 옵션에 좀 더 큰 버퍼 크기를 설정하므로써 이 문제를 해결할 수 있다. 그러나 <font style=color:#D55E53>exec</font>는 Node로 많은 양의 버퍼를 반환하기 위한 프로세스를 위한 함수가 아니므로 버퍼 크기를 설정하는 옵션을 설정할 필요는 없다. 이러한 경우 여러분은 <font style=color:#D55E53>spwan</font>함수를 사용해야한다. 그러면 <font style=color:#D55E53>exec</font>는 어떤 경우에 사용해야하는가? 데이터가 아닌 프로그램 수행의 결과에 대한 상태를 반환받기 위해서 사용해야한다.

<font style=color:#D55E53>exec</font>는 '동기적인 비동기'라고 하는데, <font style=color:#D55E53>exec</font> 함수는 비동기적으로 실행된다고 하더라도, 차일드 프로세스가 끝나고 한번에 데이터를 버퍼에 담아 반환할 때까지 기다리는 것을 의미한다. 만약, <font style=color:#D55E53>exec</font>의 버퍼 크기가 충분히 설정되어 있지 않으면, 함수의 실행은 'maxBuffer exceeded' 에러와 함께 실패한다.

이 [예제](http://www.hacksparrow.com/using-node-js-to-download-files.html#nodejs-wget)를 봐라. 나는 이 [예제](http://www.hacksparrow.com/using-node-js-to-download-files.html#nodejs-wget)에서 파일들을 다운로드 하기 위한 **wget**을 실행하고 이 실행의 상태를 Node에 업데이트 하기 위해 <font style=color:#D55E53>exec</font>를 사용하였다.

<font style=color:#D55E53>spawn</font>과 <font style=color:#D55E53>exec</font> 함수의 차이점은 이와같다. 여러분이 차일드 프로세스로부터 많은 양의 바이너리 데이터를 Node로 전달받아야할 때는 <font style=color:#D55E53>spawn</font>을 사용하고, 차일드 프로세스로부터 간단한 실행 상태 메시지를 전달받아야할 때는 <font style=color:#D55E53>exec</font>를 사용해라.

## Reference

* [Difference between spawn and exec of Node.js child_process](https://www.hacksparrow.com/difference-between-spawn-and-exec-of-node-js-child_process.html)
* [Using Node.js to download files](http://www.hacksparrow.com/using-node-js-to-download-files.html#nodejs-curl)
