package main

import (
	"fmt"
)

func main() {
	fmt.Println(Opposite(1) == -1)
	fmt.Println(Opposite(14) == -14)
	fmt.Println(Opposite(-34) == 34)
}

func Opposite(value int) int {
	return value * -1
}