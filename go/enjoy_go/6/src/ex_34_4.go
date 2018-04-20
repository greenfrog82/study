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
