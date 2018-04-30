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