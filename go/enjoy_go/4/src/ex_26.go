package main

import "fmt"

func main() {
	// 지연 호출한 함수가 실행되는 순서는 자료구조의 스택(LIFO)와 동일
	defer func() {
		fmt.Println(1)
	}()
	defer func() {
		fmt.Println(2)
	}()

	value := 1

	if 0 == value {
		fmt.Println("value is 0")
		return
	}

	fmt.Println(100 / value);
}