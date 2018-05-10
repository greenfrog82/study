package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println(Accum("abcd") == "A-Bb-Ccc-Dddd")
	fmt.Println(Accum("RqaEzty") == "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy")
	fmt.Println(Accum("cwAt") == "C-Ww-Aaa-Tttt")
}

func Accum(s string) string {
	words := make([]string, len(s))

	for i, c := range s {
		words[i] = strings.Title(strings.Repeat(strings.ToLower(string(c)), i+1))	
	}

	return strings.Join(words, "-")
}