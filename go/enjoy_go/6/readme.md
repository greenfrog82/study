# 6주차 스터디 

* UNIT 33 고루틴 사용하기
* UNIT 34 채널 사용하기

## UNIT 33 고루틴 사용하기 

고루틴(Goroutine)은 함수를 동시에 실행시키는 기능으로 쓰레드와 비슷한 것으로 이해하면 된다.  
하지만 스레드보다 운영체제의 리소스를 적게 사용한다는 장점이 있다. 

TODO: 고루틴 상세 조사

방법은 다음과 같다. **go** 키워드와 함께 고루틴으로 실행시키고자 하는 함수를 전달한다. 

>go func()

#### Example

다음은 간단한 예제인데, 한가지 주의해야하는것은 고루틴은 메인 프로세스가 종료되면 함께 종료된다는 것이다.  
따라서 아래 고루틴 호출코드 밑에 fmt.Scanln()과 같은 함수를 통해 메인 프로세스의 종료를 막아야한다.  

TODO: 쓰레드는 데몬 모드가 존재한다. 확인 필요.

```go
package main

import "fmt"

func hello() {
	fmt.Println("Hello, world")
}

func main() {
	go hello()
	fmt.Scanln()
}
```

### UNIT 33.1 멀티코어 활용하기

Go 언어는 기본적으로 CPU의 코어를 한 개만 사용하도록 설정되어 있다.  
따라서, CPU의 모든 코어 또는 특정 개수의 코어를 사용하고 싶다면 이를 지정해주어야한다.

Go 언어에서 사용하고자 하는 CPU의 코어 개수를 정의하는 방법은 **runtime** 패키지의 **GOMAXPROCS** 함수에 사용하고자 하는 CPU의 코어 개수를 전달하는 것이다.  
다음과 같이 사용하고자 하는 CPU의 코어 개수를 정의한 후 앞서 살펴본 방법과 동일하게 고루틴을 생성하면 된다. 

>runtime.GOMAXPROCS(count of core of CPU)

#### Example

```go
package main

import (
	"fmt"
	"runtime"
)

func main() {
    // 모든 코어개수 전달 
	runtime.GOMAXPROCS(runtime.NumCPU())

    // runtime.GOMAXPROCS 함수에 0을 전달하면 현재 설정 된 코어 개수를 반환한다. 
	fmt.Println(runtime.GOMAXPROCS(0))

	s := "Hello, world"

	for i:=0; i<10; i++ {
		go func(n int) {
			fmt.Println(s, n)
		}(i)
	}

	fmt.Scanln()
}
```

### UNIT 33.2 클러저를 고루틴으로 실행하기 

for문 안에서 클로저를 통해 고루틴을 정의할 때 주의해야하는 사항은 다음과 같다.  

>고루틴은 for문이 끝난 다음에 생성되어 동작한다. 

#### Example

일단 다음 예제를 실행해보자. 

```go
package main

import (
	"fmt"
	"runtime"
)

func main() {
	runtime.GOMAXPROCS(1)

	s:="Hello, world!"

	fmt.Println("----------------------------")
	for i:=0; i<10; i++ {
		go func(n int) {
			fmt.Println(s, n)
		}(i)
	}
	fmt.Println("----------------------------")

	fmt.Scanln()
}
```

실행 결과는 다음과 같다.  
다음과 같이 for문이 끝나고서야 고루틴이 생성되어 실행되는 것을 알 수 있다. 

```sh
----------------------------
----------------------------
Hello, world! 9
Hello, world! 0
Hello, world! 1
Hello, world! 2
Hello, world! 3
Hello, world! 4
Hello, world! 5
Hello, world! 6
Hello, world! 7
Hello, world! 8
```

따라서 앞서 예제와 같이 고루티으로 전달하는 함수의 인자로 for문의 offset을 전달하지 않고 클로저 내부에서 직접 참조한다면 for문이 다 끝난 후의 offset이 전달 되므로 의도와 다른 결과를 가져올 것이다. 
앞서 고루틴의 함수를 수정해서 offset을 인자로 전달하지 않고 직접 참조하도록 수정한 후 실행해보자. 

```go
package main

import (
	"fmt"
	"runtime"
)

func main() {
	runtime.GOMAXPROCS(1)

	s:="Hello, world!"

	fmt.Println("----------------------------")
	for i:=0; i<10; i++ {
		go func() {
			fmt.Println(s, i)
		}()
	}
	fmt.Println("----------------------------")

	fmt.Scanln()
}
```

위 코드의 실행결과는 다음과 같다. 

```sh
----------------------------
----------------------------
Hello, world! 10
Hello, world! 10
Hello, world! 10
Hello, world! 10
Hello, world! 10
Hello, world! 10
Hello, world! 10
Hello, world! 10
Hello, world! 10
Hello, world! 10
```

**for문 안에서 고루틴을 클로저를 통해 생성할 때는 위 내용을 주의하자!!**

## UNIT 34 채널 사용하기 

채널은 고루틴끼리 데이터를 주고받고, 실행 흐름을 제어하는 기능을 한다. 
채널은 다음과 같이 **make**함수와 **chan**키워드를 통해서 생성한다.  

>make(chan data type)

위와 같은 형태로 생성된 채널을 동기채널이라하고, 채널에 데이터가 쓰일때까지 데이터를 읽는쪽은 대기를 하게된다.   
채널은 데이터 접근에 대한 동기화를 보장한다. 

채널에 데이터를 쓰는 방법은 다음과 같다. 

>channel <- value

채널에 데이터를 읽는 방법은 다음과 같다. 

><- channel

생성 된 채널을 고루틴의 함수로 전달할 때 역시, **chan**키워드를 사용한다. 

>func(variable name **chan** data type)

#### Example

다음 채널을 통해 고루틴과 메인 스레드가 데이터를 주고받는 아주 간단한 예제이다.  
**make**함수를 통해 채널을 생성했는데, 이 경우 동기화 채널이 생성된다.  
따라서, 해당 채널에서 데이터를 읽어가기 위한 메인 스레드는 고루틴이 데이터를 쓸때 까지 대기하게 되고 데이터를 읽은 후 다음코드를 동작시키게 된다.   
때문에 이번 예제에서는 메인 스레드의 흐름을 멈추기 위해서 사용한 fmt.Scanln 함수를 사용하지 않았다. 

```go
package main

import "fmt"

func sum(a int, b int, c chan int) {
	c <- a + b
}

func main() {
	c := make(chan int)

	go sum(1, 2, c)

	n := <- c

	fmt.Println(n)
}
```

다음은 동기화 채널을 통해 고루틴과 메인 스레드가 핑퐁하는 형식으로 실행되는 예제이다. 
동기화 채널의 경우 채널에 데이터가 입력될때 까지 대기하는 성질을 이용하였다. 이와 같이 채널을 이용하면 각 코드 흐름간에 데이터 전달 이외에도 프로그램의 흐름을 제어하는 용도로도 사용이 가능하다. 

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	done := make(chan bool)
	count := 3

	go func() {
		for i:=0; i<count; i++ {
			done <- true
			fmt.Println("고루틴 : ", i)
			time.Sleep(1 * time.Second)
		}
	}()

	for i:=0; i<count; i++ {
		<- done
		fmt.Println("메인 스레드 : ", i)
	}
}
```

앞선 예제의 실행 결과는 다음과 같다. 

```sh
고루틴 :  0
메인 스레드 :  0
고루틴 :  1
메인 스레드 :  1
고루틴 :  2
메인 스레드 :  2
```

## 34.2 채널 버퍼링

TODO : 책에서는 버퍼를 1개 이상 설정하면 비동기 채널을 만든다고 되어있는데 1개이면 동기 채널 아닌가? 

채널 버퍼링은 채널에 쓸수 있는 데이터 공간을 2개이상인 채널을 생성하는 것을 말하며 이렇게 생성 된 채널을 비동기채널이라 한다. 
비동기 채널의 경우 동기화 채널과 마찬가지로 데이터를 읽는쪽에서 데이터가 없는 경우와 버퍼 사이즈만큼 데이터가 전달되기 전까지 대기를 하고, 쓰는 쪽에서는 버퍼에 데이터가 가득 차면 대기하게 된다. 
비동기 채널 역시 데이터에 대한 동기화를 보장한다. 

비동기 채널을 생성하는 방법은 다음과 같다. 

>make(chan data type, buffer size)

#### Example

다음 예제는 책에 있는 예제를 실행했다가 비동기 채널의 동작이 책에서 설명한 것과 다른것 같아 이를 확인하기 위해 작성한 예지이다. 
일단 비동기 채널에 버퍼사이즈를 2로 하고 쓰는쪽(고루틴)과 읽는쪽(메인 스레드)에서 각각 채널의 데이터를 쓰도록 하였다. 

```go
package main

import (
	"fmt"
)

func main() {
    ch := make(chan int, 2)
    count := 4

	fmt.Println("---------------------------------")
	go func() {
		for i:=0; i<count; i++ {
			fmt.Println("Go")
			ch <- i 
			fmt.Println("----")
		}
	}()
	fmt.Println("---------------------------------")

	for i:=0; i<count; i++ {
		fmt.Println("Main Thread : ", <- ch)
	}
}
```

TODO:
실행 결과는 다음과 같다.  
실행 결과는 보면 설명과 달리 동작하는것 같지만 잘 살펴보면 그렇지 않다.  
고루틴은 0, 1을 비동기 채널에 쓰고, 메인 쓰레드는 버퍼가 꽉 찰때까지 기다리다가 0, 1을 읽었는데 0을 읽는 사이에 다시 2, 3을 쓴것이다.  
만약 메인 쓰레드에서 버퍼가 꽉 찰 때까지 기다리지 않고 또 고루틴에서 버퍼에서 데이터가 하나 읽혓을 때 연속적으로 데이터를 쓰지 않았다면 다음과 같이 출력되지 않을 것이다. 


```sh
---------------------------------
---------------------------------
Go
----
Go
----
Go
----
Go
Main Thread :  0
Main Thread :  1
Main Thread :  2
Main Thread :  3
```

