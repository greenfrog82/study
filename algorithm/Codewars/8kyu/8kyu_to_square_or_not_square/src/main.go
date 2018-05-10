package main

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

func SquareOrSquareRoot(arr []int) []int {
	result := make([]int, len(arr))

	for idx, num := range arr {
		sqrt := math.Sqrt(float64(num))
		strValue := strconv.FormatFloat(sqrt, 'f', -1, 64)
		if 0 <= strings.Index(strValue, ".") {
			result[idx] = num * num
		} else {
			result[idx] = int(sqrt)
		}
	}

	return result
}

func main() {
	fmt.Println(SquareOrSquareRoot([]int{4,3,9,7,2,1}))
}