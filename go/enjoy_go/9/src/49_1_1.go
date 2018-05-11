package main

import (
	"fmt"
	"os"
)

func main() {
	file, err := os.Create("hello.txt")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer file.Close()

	s := "Hello, world!"

	n, err := file.Write([]byte(s))
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(n, "바이트 저장 완료")
}