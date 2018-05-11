package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"io"
)

func main() {
	file, err := os.OpenFile(
		"hello.txt",
		os.O_CREATE | os.O_RDWR | os.O_TRUNC,
		os.FileMode(0644))

	if err != nil {
		fmt.Println(err)
		return
	}

	defer file.Close()

	s := "Hello, world!"
	// s2 := "\nMelong"

	w := bufio.NewWriter(file)

	// w.ReadFrom(strings.NewReader(s))
	// w.ReadFrom(strings.NewReader(s2))

	io.Copy(w, strings.NewReader(s))

	w.Flush()
}