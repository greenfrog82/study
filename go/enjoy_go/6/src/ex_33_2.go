package main

import (
	"fmt"
	"math/rand"
	"time"
)

func hello(n int) {
	r := rand.Intn(10)
	time.Sleep(time.Duration(r) * time.Millisecond * 50)
	fmt.Println(n)
}

func main() {
	for i:=0; i<100; i++ {
		go hello(i)
	}

	fmt.Scanln()
}
