# [8kyu Count of positives / Sum of negatives]

Given an array of integers.

Return an array, where the first element is the count of positives numbers and the second element is sum of negative numbers.

If the input array is empty or null, return an empty array:

* C#/Java: new int[] {} / new int[0];
* C++: std::vector<int>();
* JavaScript/CoffeeScript/TypeScript/PHP/Haskell: [];
* Rust: Vec::<i32>::new();

### ATTENTION!

The passed array should NOT be changed. Read more here.

#### For example:

```python
input [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]
return [10, -65].
```

## My Solution

```python
def count_positives_sum_negatives(arr):
    return [] if not arr else [sum([0 < num for num in arr]), sum([num for num in arr if 0 > num])]
```

## Ohter Solution

```python
def count_positives_sum_negatives(arr):
    return [len([x for x in arr if x > 0]), sum(x for x in arr if 0 > x)] if arr else []
```