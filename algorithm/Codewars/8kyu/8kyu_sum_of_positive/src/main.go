package main

import (
	"fmt"
)

func SumPositive(arr []int) int {
	sum := 0
	for _, num := range arr {
		if 0 >= num {
			continue
		}	
		sum += num
	}
	return sum
}

func main() {
	fmt.Println(20 == SumPositive([]int{ 1, -4, 7, 12 }))
}