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

	time.Sleep(1 * time.Second)
}