from itertools import product

def cartesian_neighbor(x, y):
    return [z for z in product(range(x - 1, x + 2), range(y - 1, y + 2)) if z != (x, y)]
    
print [(1, 1), (1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2), (3, 3)] == cartesian_neighbor(2, 2)
