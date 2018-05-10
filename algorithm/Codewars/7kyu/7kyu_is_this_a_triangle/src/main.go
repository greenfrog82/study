package main

import (
	"fmt"
	"sort"
)

func IsTriangle(a, b, c int) bool {
	nums := []int {a, b, c}
	sort.Ints(nums[:])
	return nums[2] < nums[0] + nums[1]
}

func main() {
	fmt.Println(!IsTriangle(5, 1, 2))
	fmt.Println(!IsTriangle(1, 2, 5))
	fmt.Println(!IsTriangle(2, 5, 1))
	fmt.Println(IsTriangle(4, 2, 3))	
	fmt.Println(IsTriangle(2, 2, 2))	
	fmt.Println(!IsTriangle(-1, 2, 3))
}