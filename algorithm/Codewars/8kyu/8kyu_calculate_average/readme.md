# [8kyu Calculate Average](https://www.codewars.com/kata/calculate-average/train/python)

Write function avg which calculates average of numbers in given list.

Python: Due to rounding issues please do not use statistics.mean or such.

## My Solution

```python
def find_average(arr):
    return sum(arr) / len(arr) if arr else 0
```