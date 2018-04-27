# [8kyu Opposite number](https://www.codewars.com/kata/opposite-number)

Very simple, given a number, find its opposite.

Examples:

```
1: -1
14: -14
-34: 34
```

But can you do it in 1 line of code and without any conditionals?


## My Solution

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Println(Opposite(1) == -1)
	fmt.Println(Opposite(14) == -14)
	fmt.Println(Opposite(-34) == 34)
}

func Opposite(value int) int {
	return value * -1
}
```

## Other Solution

```go
func Opposite(value int) int {
    return -value
}