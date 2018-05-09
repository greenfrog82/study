# [8kyu To square(root) or not to square(root)](https://www.codewars.com/kata/to-square-root-or-not-to-square-root)

Write a method, that will get an integer array as parameter and will process every number from this array.
Return a new array with processing every number of the input-array like this:

```
If the number has an integer square root, take this, otherwise square the number.

[4,3,9,7,2,1] -> [2,9,3,49,4,1]
```

The input array will always contain only positive numbers and will never be empty or null.

The input array should not be modified!

Have fun coding it and please don't forget to vote and rank this kata! :-)

I have also created other katas. Take a look if you enjoyed this kata!


## My Solution

```go
package main

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

func SquareOrSquareRoot(arr []int) []int {
	result := make([]int, len(arr))

	for idx, num := range arr {
		sqrt := math.Sqrt(float64(num))
		strValue := strconv.FormatFloat(sqrt, 'f', -1, 64)
		if 0 <= strings.Index(strValue, ".") {
			result[idx] = num * num
		} else {
			result[idx] = int(sqrt)
		}
	}

	return result
}
```

## Other Solution

```go
package kata

import "math"

func SquareOrSquareRoot(arr []int) []int {
  results := make([]int, len(arr))
  
  for i, x := range arr {
    sqrt := math.Sqrt(float64(x))
    
    if sqrt == math.Floor(sqrt) {
      results[i] = int(sqrt)
    } else {
      results[i] = x * x
    }
  }
  
  return results
}
```


