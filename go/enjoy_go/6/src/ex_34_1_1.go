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