package main

import "fmt"

func combat(health, damage float64) float64 {
	ret := 0.0
	if health > damage {
		ret = health - damage
	}
	return ret
}

func main() {
	fmt.Println(50.0 == combat(100.0, 50.0))
	fmt.Println(0.0 == combat(1.0, 100))
}