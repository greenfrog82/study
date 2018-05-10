package main

import (
	"fmt"
	"strings"
)

func RepeatStr(repetitions int, str string) string {
	return strings.Repeat(str, repetitions)	
}


func main() {
	fmt.Println("IIIIII" == RepeatStr(6, "I"))
	fmt.Println("HelloHelloHelloHelloHello" == RepeatStr(5, "Hello"))
}