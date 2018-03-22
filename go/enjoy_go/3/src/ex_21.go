package main

import "fmt"

func main() {
	fmt.Println("// --------------------------------------------------------------")
	fmt.Println("// 배열 정의하기")
	fmt.Println("// --------------------------------------------------------------")

	var a1 [5]int = [5]int{1,2,3,4,5}
	var a2 = [5]int{1,2,3,4,5}
	a3 := [5]int{1,2,3,4,5}
	a4 := [...]int{1,2,3,4,5}
	a5 := [...]int {
	    1,
	    2,
	    3,
	    4,
	    5,
	}

	fmt.Println(a1)
	fmt.Println(a2)
	fmt.Println(a3)
	fmt.Println(a4)
	fmt.Println(a5)

	fmt.Println("// --------------------------------------------------------------")
	fmt.Println("// 다차원 배열 정의하기")
	fmt.Println("// --------------------------------------------------------------")

	var multi1 [2][2]int
	fmt.Println(multi1)
	
	multi2 := [3][2]int {
		{1, 2},
		{3, 4},
		{4, 5},
	}
	fmt.Println(multi2)

	multi3 := [...][2]int {
		{1, 2},
		{3, 4},
	}
	fmt.Println(multi3)
}