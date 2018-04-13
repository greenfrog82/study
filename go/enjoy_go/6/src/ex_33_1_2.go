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

		// 고루틴은 for loop가 끝나고 생성되므로 다음과 같이 i값을 전달하면 모든 고루틴이 10 출력.
		// go func() {
		// 	fmt.Println(s, i)
			
		// }()
	}
	fmt.Println("----------------------------")

	fmt.Scanln()
}