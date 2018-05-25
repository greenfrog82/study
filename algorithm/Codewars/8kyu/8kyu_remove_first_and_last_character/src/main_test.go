package main

import "testing"

type TestData struct {
	argument 	string
	result		string
}

var testdata = []TestData { 
	{"abcd", "bc"}, 
	{"abcde", "bcd"},
}

func TestMain(t *testing.T) {
	for _, d := range testdata {
		r := RemoveFirstAndLastChar(d.argument)
		if r != d.result { 
			t.Error("Fail : ", r)
		}
	}
	
}