package main

import (
	"fmt"
)

func HasUniqueChar(str string) bool {
	var m = map[rune]bool{}
	for _, w := range str {
		m[w] = true
	}
	return len(m) == len(str)
}

func main() {
	fmt.Println(!HasUniqueChar("  nAa"))
	fmt.Println(HasUniqueChar("abcde"))
	fmt.Println(!HasUniqueChar("++-"))
	fmt.Println(HasUniqueChar("AaBbC"))
}
