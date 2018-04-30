package main

import (
	"fmt"
	"runtime"
	"time"
	"sync"
)

func main() {
	// runtime.GOMAXPROCS(runtime.NumCPU())
	// runtime.GOMAXPROCS(1)

	// fmt.Println(runtime.GOMAXPROCS(0))
	mutex := new(sync.Mutex)

	var data = []int{}

	process := func() {
		for i:=0; i<1000; i++ {
			mutex.Lock()
			data = append(data, 1)
			mutex.Unlock()
			runtime.Gosched()
			
		}
	}

	for i:=0; i<100; i++ {
		go process()
	}

	time.Sleep(5 * time.Second)
	
	fmt.Println(len(data))
}