package main

import (
	"fmt"
	"runtime"
)

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())

	fmt.Println(runtime.GOMAXPROCS(0))

	s := "Hello, world"

	for i:=0; i<10; i++ {
		go func(n int) {
			fmt.Println(s, n)
		}(i)
	}

	fmt.Scanln()
}