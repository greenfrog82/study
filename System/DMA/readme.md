# DMA (Direct Memory Access)

NonBlocking I/O 프로그래밍을 할 때 전제는 I/O처리와 CPU연산이 분리되어 있다는 것이다. 다시 말해서, CPU는 I/O처리를 요청한 후 응답을 대기하는 것이 아닌, 다른 처리를 하고 있다가 I/O처리가 끝나면 콜백을 받아 I/O 응답에 대한 나머지 처리를 진행한다는 것이다.

그런데 여기서 두 가지 궁금증이 생겼다.

1. CPU가 누구한테 I/O처리에 대한 요청을 하길래 비동기 처리가 가능한 것일까?
2. CPU가 현재 특정 작업을 처리 중인데 요청한 I/O처리가 끝나 콜백이 오면 어떻게 처리가 진행되는 것일까?

## 1. CPU가 누구한테 I/O처리에 대한 요청을 하길래 비동기 처리가 가능한 것일까?

이 질문에 대한 답은 DMA Controller이다. 그렇다면 DMA Controller는 무엇일까? DMA Controller는 DMA(Direct Memory Access)가 가능하게 해주는 칩셋이다. 그러면 DMA는 무엇인가? 결국 NonBlocking I/O가 가능하게 해주는것은 바로 이 DMA라는 개념이 있고 이를 구현한 칩셋이 있기 때문이다. 그러면 DMA가 무엇인지 알아보자.

DMA란 Direct Memory Access의 약자로 네트워크 카드, 하드디스크, 그래픽 카드 등의 I/O 처리가 필요한 하드웨어가 CPU를 사용하지 않고 메인 메모리(RAM)에 직접 접근할 수 있도록 해주는 컴퓨터 시스템의 기능이다. 이를 좀 더 쉽게 이야기하면 I/O 처리를 CPU 연산을 사용하지 않고 진행할 수 있도록 해주는 컴퓨터 시스템의 기능이라고 설명할 수 있다.

예전에 DMA라는 기능이 없을 때는 [Programmed I/O]((https://en.wikipedia.org/wiki/Programmed_input/output))라고 해서 CPU에서 I/O처리에 관여 했기 때문에 I/O가 끝나기 전까지는 다른 작업을 처리할 수 없었다고 한다.

그렇다면 모든 컴퓨터 시스템에 DMA가 적용되어 있지 않을텐데, 그렇하면 어떻게 NonBlocking I/O를 할 수 있을까? Node.js의 경우 NonBlocking I/O API를 호출하였을 때 DMA를 지원하지 않는 컴퓨터 시스템에서는 Thread Pool을 이용해서 NonBlocking I/O 처리가 될 수 있도록 한다.

## 2. CPU가 현재 특정 작업을 처리 중인데 요청한 I/O처리가 끝나 콜백이 오면 어떻게 처리가 진행되는 것일까?

우선, [Interrupt](https://en.wikipedia.org/wiki/Interrupt)라는 개념이 있는데 이를 이용해서 시스템은 I/O처리에 대한 콜백이 처리되도록한다. 그렇다면 [Interrupt](https://en.wikipedia.org/wiki/Interrupt)이 무엇일까?

[Interrupt](https://en.wikipedia.org/wiki/Interrupt)은 하드웨어 또는 소프트웨어가 CPU에게 주는 신호로서 현재 진행 중인 작업보다 높은 우선순위를 갖는다. 따라서 하드웨어 또는 소프트웨어로 부터 [Interrupt](https://en.wikipedia.org/wiki/Interrupt)이 발생하면 CPU는 현재 작업 중 **상태**를 저장하고 [Interrupt](https://en.wikipedia.org/wiki/Interrupt) Handler(예를들면 CallBack 함수)를 호출해서 [Interrupt](https://en.wikipedia.org/wiki/Interrupt)에 대한 처리를 수행한 후 다시 저장되었던 **상태**를 복원해서 [Interrupt](https://en.wikipedia.org/wiki/Interrupt)이 발생하기 전 처리하던 작업을 다시 처리하게 된다.

# 참조

* [WIDIPEDIA - Direct memory access](https://en.wikipedia.org/wiki/Direct_memory_access)
* [WIDIPEDIA - Programmed input/ouput](https://en.wikipedia.org/wiki/Programmed_input/output)
* [WIDIPEDIA - Interrupt](https://en.wikipedia.org/wiki/Interrupt)
* [Direct memory Access (DMA)](https://www.techopedia.com/definition/2767/direct-memory-access-dma)
* [Blocking and Nonblocking I/O](http://faculty.salina.k-state.edu/tim/ossg/Device/blocking.html)
* [빠르게 훝어보는 node.js 온라인 강좌](http://www.devblog.kr/r/8y0gFPAvJ2Y8X93raWlrmu9ZEIWcsKEvfFSTs)
