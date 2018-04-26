# [8Kyu Century From Year](https://www.codewars.com/kata/century-from-year/go) 

## Introduction

The first century spans from the year 1 up to and including the year 100, The second - from the year 101 up to and including the year 200, etc.

## Task :

Given a year, return the century it is in.

### Input , Output Examples ::

```go
centuryFromYear(1705)  returns (18)
centuryFromYear(1900)  returns (19)
centuryFromYear(1601)  returns (17)
centuryFromYear(2000)  returns (20)
```

Hope you enjoy it .. Awaiting for Best Practice Codes

Enjoy Learning !!!


## My Solution

```go
func century(year int) int {
	month := year % 100
	year = year / 100

	if 0 == month {
		return year
	} else {
		return year + 1
	}
}
```

## Other Solution

```go
func century(year int) int {
  return (year + 99)/100 
}
```

	