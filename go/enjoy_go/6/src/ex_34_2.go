package main

import (
	"fmt"
	"time"
	"runtime"
)

func main() {
	runtime.GOMAXPROCS(1)

	ch := make(chan int, 2)
	count := 5

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
			time.Sleep(time.Second * 2)
		}
		fmt.Println("[Main function] : ", <- ch)
	}
}