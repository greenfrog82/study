def cartesian_neighbor(x, y):
    return [(x+i, y+j) for i in range(-1, 2) for j in range(-1, 2) if i or j]

print [(1, 1), (1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2), (3, 3)] == cartesian_neighbor(2, 2)
