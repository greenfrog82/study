# Even or Odd

Create a function that takes an integer as an argument and returns "Even" for even numbers or "Odd" for odd numbers.

## My Solution

```go
func EvenOrOdd(number int) string {
  if 0 == number % 2 {    
    return "Even"    
  } else {    
    return "Odd"    
  }    
}
```

## Other Solution

```go
func EvenOrOdd(number int) string {
  if 0 == number % 2 {    
    return "Even"    
  }     
  return "Odd"    
}
```