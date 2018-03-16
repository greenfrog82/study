package main

import "fmt"

func main() {
	for i:=99; i>1; {
		stuff := "bottles"
		
		fmt.Println(fmt.Sprintf("%[1]d %[2]s of bear on the wall, %[1]d %[2]s of bear\n", i, stuff));

		i--
		if 1 >= i {
			stuff = "bottle"
		}

		fmt.Println(fmt.Sprintf("Take one down, pass it around, %d %s of beer on the wall.", i, stuff));
	}
}