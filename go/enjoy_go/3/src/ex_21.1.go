package main

import "fmt"

func main() {
	a := [...]int{1, 2, 3, 4, 5}

	fmt.Println("// --------------------------------------------------------------")
	fmt.Println("// len 사용하기")
	fmt.Println("// --------------------------------------------------------------")

	for i:=0; i<len(a); i++ {
		fmt.Println(a[i])
	}
	
	fmt.Println("// --------------------------------------------------------------")
	fmt.Println("// range 사용하기")
	fmt.Println("// --------------------------------------------------------------")

	for i, value := range a {
		fmt.Println(i, value)
	}

	fmt.Println("// --------------------------------------------------------------")
	fmt.Println("// range을 통해 다차원 배열 순회하기")
	fmt.Println("// --------------------------------------------------------------")

	b := [...][2]int {
		{1, 2},
		{3, 4},
	}

	for i, row := range b {
		for j, value := range row {
			fmt.Println(i, j, value)
		}
	}

	fmt.Println("// --------------------------------------------------------------")
	fmt.Println("// range의 index만 사용하기")
	fmt.Println("// --------------------------------------------------------------")

	for idx := range a {
		fmt.Println(idx)
	}

	fmt.Println("// --------------------------------------------------------------")
	fmt.Println("// range의 index는 생략하고 value만 사용하기")
	fmt.Println("// --------------------------------------------------------------")

	for _, value := range a {
		fmt.Println(value)
	}

	// for i, value := range a {
		// fmt.Println(i)
	// }
}