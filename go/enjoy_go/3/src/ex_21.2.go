package main

import "fmt"

func main() {
	a := [...]int{1, 2, 3}
	b := a

	fmt.Println(a)
	b[1] = 100
	fmt.Println(b)
}