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