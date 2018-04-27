# [7kyu Mumbling](https://www.codewars.com/kata/mumbling)

This time no story, no theory. The examples below show you how to write function accum:

### Examples:

```
accum("abcd") // -> "A-Bb-Ccc-Dddd"
accum("RqaEzty") // -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
accum("cwAt") // -> "C-Ww-Aaa-Tttt"
```

The parameter of accum is a string which includes only letters from a..z and A..Z.

## My Solution

```go
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
```

## Other Solution

```go
package kata

import "strings"

func Accum(s string) string {
    parts := make([]string, len(s))
    
    for i := 0; i < len(s); i++ {
      parts[i] = strings.ToUpper(string(s[i])) + strings.Repeat(strings.ToLower(string(s[i])), i)
    }
    
    return strings.Join(parts, "-")
}
```

```go
package kata

import (
	"strings"
)

func Accum(s string) string {
	words := make([]string, len(s))

	for i, c := range s {
		words[i] = strings.Title(strings.Repeat(strings.ToLower(string(c)), i+1))	
	}

	return strings.Join(words, "-")
}