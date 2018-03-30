package main

import "fmt"

func f() {
	defer func() {
		s := recover()
		fmt.Println(s)
	}()

	a := [...]int{1, 2}

	for i:=0; i<5; i++ {
		fmt.Println(a[i])
	}
}

func main() {
	defer func() {
		fmt.Println("I'm interested in Go-lang")

	}()
	// f()
	// func() {
	// 	defer func() {
	// 		s := recover()
	// 		fmt.Println(s)
	// 	}()

	// 	a := [...]int{1, 2}
	
	// 	for i :=0; i<5; i++ {
	// 		fmt.Println(a[i])
	// 	}
	// }()

// 	func() {
// 		defer func() {
// 			s := recover()
// 			fmt.Println(s)
// 		}()
// // 
// 		value := 0
// 		result := 100 / value
// 		fmt.Println(result)
// 	}()

	// Why does the below codes not work well?
	// The below sentence from which is https://blog.golang.org/defer-panic-and-recover is answer.
	// Recover is a built-in function that regains control of a panicking goroutine.
	// Recover is only useful inside deferred functions. During normal execution, a call to recover will return nil and have no other effect. 
	// If the current goroutine is panicking, a call to recover will capture the value given to panic and resume normal execution.
	defer func() {
		s := recover()
		fmt.Println(s)
	}()

	value := 0
	res := 100 / value
	fmt.Println(res)

	fmt.Println("Hello, World")
}