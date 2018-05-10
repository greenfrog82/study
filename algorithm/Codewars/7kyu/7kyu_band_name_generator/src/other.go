package main

import (
	"fmt"
	"strings"
)

func _bandNameGenerator(word string) string {
	if word[0] == word[len(word) - 1] {
		return strings.Title(word + word[1:])
	} else {
		return strings.Title("The " + word)
	}
}

func main() {
	fmt.Println("The Dolphin" == _bandNameGenerator("dolphin"))
	fmt.Println("Alaskalaska" == _bandNameGenerator("alaska"))	
	fmt.Println("The Step-Daughter" == _bandNameGenerator("step-daughter"))
}