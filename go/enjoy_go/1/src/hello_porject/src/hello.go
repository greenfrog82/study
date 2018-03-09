package main

import "fmt"
// import "unsafe"

func main() 				{     
		// fmt.Println("Hello, workd!")
		// fmt.Println('Hello, workd!')

	// a := 100
	// fmt.Println(unsafe.Sizeof(a))


	const (
		Sun = iota
		Monday
		Tuesday
	)

	const (
		Name = iota
		Age
	)

	fmt.Println(Name)
}