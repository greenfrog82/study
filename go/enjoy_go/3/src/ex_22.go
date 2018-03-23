package main

import "fmt"

func main() {
	a := make([]int, 5, 10)

	fmt.Println(len(a))
	fmt.Println(cap(a))

	b := []int{1, 2, 3, 4}

	fmt.Println(len(b))
	fmt.Println(cap(b))
	
	c := []int{1, 2, 3}
	d := []int{4, 5, 6}

	
}
