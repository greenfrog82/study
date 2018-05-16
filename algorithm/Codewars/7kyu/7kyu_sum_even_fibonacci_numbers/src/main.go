package main

import "fmt"

// func fibonacci(num int) []int {
// 	if 1 > num {
// 		return 1
// 	} else {
// 		return fibonacci(num - 2) + fibonacci(num - 1)
// 	}
// }

func wrapper() func(int) int {
	sum := 0	
	return func(num int) int {
		sum = sum + num
		return sum
	}
}


func main() {
	// fmt.Println(fibonacci(3))	
	perform := wrapper()
	fmt.Println(perform(100))
	fmt.Println(perform(100))
}