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

따라서 앞서 예제와 같이 고루틴으로 전달하는 함수의 인자로 for문의 index를 전달하지 않고 클로저 내부에서 직접 참조한다면 for문이 다 끝난 후의 index가 전달 되므로 의도와 다른 결과를 가져올 것이다. 
앞서 고루틴의 함수를 수정해서 index를 인자로 전달하지 않고 직접 참조하도록 수정한 후 실행해보자. 

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
채널은 다음과 같이 **make**함수와 **chan**키워드를 통해서 생성하며, 채널 자체는 값이 아닌 레퍼런스 타입이다. 

>make(chan data type)

위와 같은 형태로 생성된 채널을 동기채널이라하고, 채널에 데이터가 쓰일때까지 데이터를 읽는쪽은 대기를 하게된다.   
채널은 데이터 접근에 대한 동기화를 보장한다. 

채널에 데이터를 쓰는 방법은 다음과 같다. 

>channel <- value

채널에 데이터를 읽는 방법은 다음과 같다. 

><- channel

생성 된 채널을 고루틴의 함수로 전달할 때 역시, **chan**키워드를 사용한다. 
채널을 매개변수로 받는 함수는 반드시 **go** 키워드를 사용하여 고루틴으로 실행해야한다. 

>func(variable_name **chan** data_type)

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
비동기 채널의 경우 동기화 채널과 마찬가지로 데이터를 읽는쪽에서 데이터가 없는 경우 대기를 하고, 쓰는 쪽에서는 버퍼에 데이터가 가득 차면 대기하게 된다. 
비동기 채널 역시 데이터에 대한 동기화를 보장한다. 

비동기 채널을 생성하는 방법은 다음과 같다. 

>make(chan data_type, buffer_size)

#### Example

다음은 위 설명을 증명하기 위한 예제이다.  
버퍼가 2개인 비동기 채널을 생성하였고, 고루틴은 쓰기 역할을 하고 메인 쓰레드는 읽기역할을 한다.  
먼저, 버퍼가 2개인 비동기 채널에 데이터가 하나라도 존재하는 경우 메인 쓰레드가 채널에서 데이터를 읽어가는지 확인한다. 
그리고 고루틴이 채널에 2개의 데이터를 모두 채운 후 쓰기를 대기하는지 확인한다. 

[Ex.34_2](./src/ex_34_2.go)

```go
package main

import (
	"fmt"
	"time"
	"runtime"
)

func main() {
	runtime.GOMAXPROCS(1)

	ch := make(chan int, 2)
	count := 4

	fmt.Println("---------------------------------")
	go func() {
		for i:=0; i<count; i++ {
			ch <- i 
			fmt.Println("[Goroutine] Writting ", i)
			if 2 > i {
				time.Sleep(time.Second)
			}
		}
	}()
	fmt.Println("---------------------------------")

	for i:=0; i<count; i++ {
		if 2 == i {
			time.Sleep(time.Second)
		}
		fmt.Println("[Main function] : ", <- ch)
	}
}
```

다음은 실행결과인데 예제를 작성한 의도데로 잘 동작함을 알 수 있다. 

```sh
---------------------------------
---------------------------------
[Goroutine] Writting  0
[Main function] :  0
[Goroutine] Writting  1
[Main function] :  1
[Goroutine] Writting  2
[Goroutine] Writting  3
[Main function] :  2
[Main function] :  3
[Main function] :  4
```

## 34.3 range와 close 사용하기

range는 채널에 값이 들어오면 close 함수를 통해 채널을 닫을 때 까지 루프를 돌면서 채널에서 데이터를 읽는다.  
**range를 사용하는 이유는 채널에 몇개의 데이터를 들어올지 모르는 경우이다.** 

TODO : 실제 코드에서 사용 예 확인 필요.

range와 close 함수는 다음과 같은 특징을 가지고 있다. 

* 이미 닫힌 채널에 값을 보내면 패닉이 발생한다. 
* 채널을 닫으면 range 루프가 종료됩니다. 
* 채널이 열려 있고, 값이 들어오지 않는다면 range는 실행되지 않고 계속 대기합니다.


[Ex.34_3](./ex_34_3.go)

#### Example 

다음은 range를 통해 쓰기 동작을 수행하는 코루틴에서 close 함수를 호출할 때까지 데이터를 읽는 예제이다. 

```go
package main

import "fmt"

func main() {
	c := make(chan int)

	go func() {
		for i:=0; i<5; i++ {
			c <- i
		}
		close(c)
	}()

	for i:= range c {
		fmt.Println(i)
	}
}
```

채널에서 데이터를 읽어 변수에 할당하면, 첫번째 리턴값은 채널에서 읽은 데이터이고 두번째 리턴값은 채널이 닫혔는지 유무이다.  
채널이 열려있는 경우 true를 닫힌 경우는 false를 반환하며, 이를 통해 채널이 닫혔는지 확인 한 후 채널이 반환한 데이터를 사용할 수 있다.  
**채널이 닫혔는지 유무를 확인 한 후 데이터를 사용하는 것은 중요한데, 채널이 닫혔더라도 채널에서 데이터를 읽으면 채널의 데이터타입의 기본 값이 반환되기 때문이다.**

[Ex.34_3_1](./ex_34_3_1.go)

```go
package main

import (
	"fmt"
)

func main() {
	c := make(chan int)

	go func() {
		c <- 1
	}()

	a, ok := <-c
	fmt.Println(a, ok)

	close(c)

	a, ok = <-c
	fmt.Println(a, ok)
}
```

다음은 실행 결과인데, 앞서 설명한바와 같이 채널이 닫혀있는데도 불구하고 값이 반환됨을 알 수 있다.  
**따라서 채널에서 데이터를 꺼낼때는 채널이 닫혀있는지 반드시 확인해야한다.**

```sh
1 true
0 false
```

## 34.4 보내기 전용 및 받기 전용 채널 사용하기 

보내기 전용 채널과 받기 전용 채널은 채널은 채널은 쓰기 또는 읽기만 가능한 채널을 말한다.  
이러한 채널을 만드는 별도의 방법이 있는 것은 아니고, 일반 채널을 생성한 후 고루틴의 매개변수로 전달할 때 화살표의 위치에 따라 결정된다.  

다음은 각각 보내기 전용 채널과 받기 전용 채널을 결정하는 방법이다. 

### 보내기 전용 채널

>variable_name chan<- data_type

### 받기 전용 채널 

>variable_name <-chan data_type

각각 전용 채널은 반대 동작을 수행하면 에러가 발생한다.  
예를들어, 보내지 전용 채널이 받기 동작을 수행하면 에러가 발생한다. 

#### Example

다음은 producer 고루틴 함수에 보내기 전용 채널을 전달하고 consumer 고루틴 함수에 받기 전용 채널을 전달해서 producer는 데이터를 생산하기만 하고 consuer는 해당 데이터를 소비하도록만 하였다. 

[./src/ex_34_4.go](Ex. 34.4)

```go
package main

import (
	"fmt"
)

func producer(c chan<- int) {
	for i:=0; i<5; i++ {
		c <- i
	}
	c <- 100
}

func consumer(c <-chan int) {
	for i:= range c {
		fmt.Println(i)
	}
}

func main() {
	c := make(chan int)

	go producer(c)
	go consumer(c)

	fmt.Scanln()
}
```

채널을 리턴값으로도 사용할 수 있다. **채널을 리턴만 하고 파라메터로 전달받지 않는 함수는 go 키워드를 사용해서 고루틴으로 동작시키지 않아도 된다.**

다음 예제는 매개변수로 전달받은 값을 담고있는 채널을 받기 전용 채널로 반환한 후, 해당 채널을 받기 전용 채널인자로 전달받은 다른 함수가 채널의 데이터를 모두 더한 후 더한 값을 갖고 있는 채널을 받기 전용 채널로 반환하는 예제이다. 

```go
package main

import (
	"fmt"
)

func num(a, b int) <-chan int {
	out := make(chan int)
	go func() {
		out <- a
		out <- b
		close(out)
	}()

	return out
}

func sum(c <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		r := 0
		for i := range c {
			r += i
		}
		out <- r
	}()

	return out
}

func main() {
	c := num(1, 2)
	out := sum(c)

	fmt.Println(<- out)
}
```

## 34.5 셀렉트 사용하기 

셀렉트는 여러 채널을 다루기 위해서 사용된다.  

셀렉트의 기본적인 형태는 다음과 같다. 

```go
select {
	case <- channel_name_1:
		code ...
	case <- channel_name_2:
		code ... 
	default:
		// 앞서 정의한 모든 채널에 값이 들어오지 않았을 때 실행할 코드 작성.
}
```

>셀렉트에서 default 구문을 사용할 때는 특히 주의를 기울여야한다.  
default 구문은 채널에 데이터가 들어오기 않으면 호출되기 때문에 루프에서 셀렉트를 정의한 경우 무한루프에 빠질 수 있다. 

셀렉트에서 채널로 입력 된 데이터를 사용하기 위해서는 다음과 같은 형태를 사용할 수 있다. 

```go
select {
	case a := <-channel_name_1:
		code ..
	case b := <-channel_name_2:
		code ..
	default:
		code ..
}
```

또는 다음과 같이 채널에 데이터를 전달하는 것도 가능하다.
TODO : 이건 어떤 경우에 쓰는지 ... 예제는 이해하겠는데

```go
select {
	case channel_name_1 <- value:
		code ...
	case variable_name := <- channel_name_2:
		code ...
}
```

#### Example

다음은 두 개의 채널을 생성하고 각각의 채널에 데이터를 넣는 고루틴을 두개 띄우고 메인 쓰레드에서는 해당 채널로 전달 된 데이터를 셀렉트를 통해 핸들링한다. 

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	c1 := make(chan int)
	c2 := make(chan string)

	go func() {
		for {
			c1 <- 10
			time.Sleep(100 * time.Millisecond)
		}
	}()

	go func() {
		for {
			c2 <- "Hello world!"
			time.Sleep(500 * time.Millisecond)
		}
	}()

	go func() {
		for {
			select {
			case i := <-c1:
				fmt.Println("c1 : ", i)
			case s := <-c2:
				fmt.Println("c2 : ", s)
		}
	}()

	time.Sleep(10 * time.Second)
}
```

앞선 예제에서 셀렉트에서 default 구문을 사용하지 않았는데, 위 예제를 약간 수정해서 default 구문에서 단순히 특정 문자열을 출력하는 예제를 작성해보자. 

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	c1 := make(chan int)
	c2 := make(chan string)

	go func() {
		c1 <- 10
	}()

	go func() {
		c2 <- "Hello world!"
	}()

	go func() {
		for {
			select {
			case i := <-c1:
				fmt.Println("c1 : ", i)
			case s := <-c2:
				fmt.Println("c2 : ", s)
			default:
				fmt.Println("default")
			}
		}
	}()

	time.Sleep(10 * time.Second)
}

위 예제의 실행 결과는 c1과 c2로 전달 된 데이터를 받은 후 채널에 더 이상 데이터가 저장되지 않으므로 나머지 시간동안 default의 출력을 반복한다. 

