package main

import (
	"fmt"
)

func HasUniqueChar(str string) bool {
	mapAscii := make(map[rune]rune)
	for _, asciiNum := range str {
		if _, exist := mapAscii[asciiNum]; exist {
			return false
		} else {
			mapAscii[asciiNum] = asciiNum
		}
	}
	return true
}

func main() {
	fmt.Println(!HasUniqueChar("  nAa"))
	fmt.Println(HasUniqueChar("abcde"))
	fmt.Println(!HasUniqueChar("++-"))
	fmt.Println(HasUniqueChar("AaBbC"))
}
