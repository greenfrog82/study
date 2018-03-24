package main

import "fmt"

func main() {
    c := []int{1, 2, 3}
    // c_ := []int{1, 2, 3}
    fmt.Println(c == nil)
    // fmt.Println(c == c_)

    d:= map[string]int{"Hello": 1}
    fmt.Println(d == nil)

    if (true) {
        fmt.Println("true")
    }
    

    Loop:
        for i:=0; i<3; i++ {
            for j:=0; j<3; j++ {
                if 2 == j {
                    break Loop
                }
                fmt.Println(i, j);
            }
        }

        fmt.Println("Hello World");
}


