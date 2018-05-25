package main

import (
	"fmt"
)

func RemoveFirstAndLastChar(str string) string {
	return str[1:len(str) - 1]	
}

// func main() {
	// fmt.Println("bc" == RemoveFirstAndLastChar("abcd"))
// }


