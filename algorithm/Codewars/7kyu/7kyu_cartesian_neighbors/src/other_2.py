def cartesian_neighbor(x, y):
    return [(i, j) for i in range(x-1, x+2) for j in range(y-1, y+2) if (i, j) != (x, y)]
    
print [(1, 1), (1, 2), (1, 3), (2, 1), (2, 3), (3, 1),
       (3, 2), (3, 3)] == cartesian_neighbor(2, 2)
