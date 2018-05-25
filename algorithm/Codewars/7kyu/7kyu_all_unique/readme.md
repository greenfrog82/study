# [7Kyu All Unique](https://www.codewars.com/kata/all-unique/train/go)

Write a program to determine if a string contains all unique characters. Return true if it does and false otherwise.

The string may contain any of the 128 ASCII characters.

## My Solution

```go
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
```

## Other Solution

```go
func HasUniqueChar(str string) bool {
	var m = map[rune]bool{}
	for _, w := range str {
		m[w] = true
	}
	return len(m) == len(str)
}
```
