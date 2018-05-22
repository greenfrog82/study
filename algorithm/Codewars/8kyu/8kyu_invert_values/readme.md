# [8kyu invert values](https://www.codewars.com/kata/invert-values/train/python)

Given a set of numbers, return the additive inverse of each. Each positive becomes negatives, and the negatives become positives.

```python
invert([1,2,3,4,5]) == [-1,-2,-3,-4,-5]
invert([1,-2,3,-4,5]) == [-1,2,-3,4,-5]
invert([]) == []
```

You can assume that all values are integers. Do not mutate the input array/list.

## My Solution

```python
def invert(lst):
    return [-num for num in lst]
```
