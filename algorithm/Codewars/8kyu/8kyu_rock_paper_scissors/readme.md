# [8kyu Rock Paper Scissors!](https://www.codewars.com/kata/rock-paper-scissors/train/python)

Rock Paper Scissors
Let's play! You have to return which player won! In case of a draw return Draw!.

Examples:

```python
rps('scissors','paper') // Player 1 won!
rps('scissors','rock') // Player 2 won!
rps('paper','paper') // Draw!
```

## My Solution

```python
def rps(p1, p2):
    cases = {'rock':'scissors', 'scissors':'paper', 'paper':'rock'}
    return 'Draw!' if p1 == p2 else 'Player 1 won!' if cases.get(p1) == cases.get(p2) else 'Plyaer 2 won!'
```

## other Solution

```python
def rps(p1, p2):
    cases = {'rock':0, 'paper':1, 'scissors':2}
    result = {'Draw!', 'Player 1 won!', 'Player 2 won!'}
    return result[cases.get(p1) - cases.get(p2)]
```