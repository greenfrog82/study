package main

import "fmt"

func main() {
	fmt.Println("Odd" == EvenOrOdd(1))	
	fmt.Println("Even" == EvenOrOdd(2))
}

func EvenOrOdd(number int) string {
  if 0 == number % 2 {    
    return "Even"    
  } else {    
    return "Odd"    
  }    
}