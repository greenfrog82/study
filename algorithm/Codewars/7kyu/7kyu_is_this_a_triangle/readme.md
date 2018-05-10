# [7kyu Is this a triangle?](https://www.codewars.com/kata/is-this-a-triangle/train/go)

Implement a method that accepts 3 integer values a, b, c. The method should return true if a triangle can be built with the sides of given length and false in any other case.

(In this case, all triangles must have surface greater than 0 to be accepted).


## My Solution

```go
package main

import (
	"fmt"
	"sort"
)

func IsTriangle(a, b, c int) bool {
	nums := []int {a, b, c}
	sort.Ints(nums[:])
	return nums[2] < nums[0] + nums[1]
}
```

## Other Solution

```go
package kata

func IsTriangle(a, b, c int) bool {
  return a+b > c && b+c > a && a+c > b
}
```
	
## Reference

* [1212 : 삼각형의 성립조건](http://codeup.kr/JudgeOnline/problem.php?id=1212)