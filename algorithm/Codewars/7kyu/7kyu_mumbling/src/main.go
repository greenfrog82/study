package main

import (
	"bytes"
	"unicode"
	"fmt"
)

func main() {
	fmt.Println(Accum("abcd") == "A-Bb-Ccc-Dddd")
	fmt.Println(Accum("RqaEzty") == "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy")
	fmt.Println(Accum("cwAt") == "C-Ww-Aaa-Tttt")
}

func Accum(str string) string {
	var buffer bytes.Buffer
	
	for idx, ch := range str {
		idx += 1
		for i:=0; i<idx; i++ {
			if 0 == i {
				buffer.WriteString(string(unicode.ToUpper(ch)))
			} else {
				buffer.WriteString(string(unicode.ToLower(ch)))
			}
		}

		if idx < len(str) {
			buffer.WriteString("-")
		}
	}

	fmt.Println(buffer.String())
	return buffer.String()
}