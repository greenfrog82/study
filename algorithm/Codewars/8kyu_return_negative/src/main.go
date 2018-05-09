package main

import (
	"fmt"
)

func MakeNegative(num int) int {
	if 0 >= num {
		return num
	}
	return -num
}

func main() {
	fmt.Println(-1 == MakeNegative(1))
	fmt.Println(-5 == MakeNegative(-5))
	fmt.Println(0 == MakeNegative(0))
}