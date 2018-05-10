# [8Kyu Grasshopper - Terminal game combat function](https://www.codewars.com/kata/grasshopper-terminal-game-combat-function-1/train/go)

Create a combat function that takes the player's current health and the amount of damage recieved, and returns the player's new health. Health can't be less than 0.

## My Solution

```go
func combat(health, damage float64) float64 {
	ret := 0.0
	if health > damage {
		ret = health - damage
	}
	return ret
}
```

## Other Solution

```go
package kata
import "math"
func combat(health, damage float64) float64 {
  return math.Max(health-damage, 0.0)
}
```