#[7kyu Cartesian neighbors](https://www.codewars.com/kata/cartesian-neighbors)

A Cartesian coordinate system is a coordinate system that specifies each point uniquely in a plane by a pair of numerical coordinates, which are the signed distances to the point from two fixed perpendicular directed lines, measured in the same unit of length.

The сoordinates of a point in the grid are written as (x,y). Each point in a coordinate system has eight neighboring points. Provided that the grid step = 1.

It is necessary to write a function that takes a coordinate on the x-axis and y-axis and returns a list of all the neighboring points. Points inside list don't have to been sorted (any order is valid).

For Example:

```python
CartesianNeighbor(2,2) -> {{1,1},{1,2},{1,3},{2,1},{2,3},{3,1},{3,2},{3,3}}
CartesianNeighbor(5,7) -> {{6,7},{6,6},{6,8},{4,7},{4,6},{4,8},{5,6},{5,8}}
```

## My Solution

```python
def cartesian_neighbor(x, y):
    ret = []
    for i in range(x-1, x+2):
        for j in range(y-1, y+2):
            if x == i and y == j:
                continue
            tmp = (i, j)
            ret.append(tmp)
    return ret
```

## Other Solution

```python
from itertools import product

def cartesian_neighbor(x, y):
    return [z for z in product(range(x - 1, x + 2), range(y - 1, y + 2)) if z != (x, y)]
```
```python
def cartesian_neighbor(x, y):
    return [(x+i, y+j) for i in range(-1, 2) for j in range(-1, 2) if i or j]
```
```python
def cartesian_neighbor(x, y):
    return [(i, j) for i in range(x-1, x+2) for j in range(y-1, y+2) if (i, j) != (x, y)]
```