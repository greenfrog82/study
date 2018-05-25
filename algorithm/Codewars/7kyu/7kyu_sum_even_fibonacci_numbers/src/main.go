package main

import "fmt"

func SumEvenFibonacci(limit int) int {
	sum := 2
	for first, second := 1, 2; second <= limit; first, second = second, first + second {
		if 2 < second && 0 == second % 2 {
			sum += second
		}
	}
	return sum
}

func main() {
	fmt.Println(10 == SumEvenFibonacci(8))
	fmt.Println(2 == SumEvenFibonacci(1))
	fmt.Println(2 == SumEvenFibonacci(2))
	fmt.Println(60696 == SumEvenFibonacci(111111))
	fmt.Println(2 == SumEvenFibonacci(5))
	fmt.Println(2 == SumEvenFibonacci(6))
}
