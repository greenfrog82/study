package main

import (
	"fmt"
)

func main() {
	fmt.Println(century(1705) == 18)
	fmt.Println(century(1900) == 19)
	fmt.Println(century(1601) == 17)
	fmt.Println(century(2000) == 20)
}

func century(year int) int {
	month := year % 100
	year = year / 100

	if 0 == month {
		return year
	} else {
		return year + 1
	}
}
	