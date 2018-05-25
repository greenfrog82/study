def cartesian_neighbor(x, y):
    ret = []
    for i in range(x-1, x+2):
        for j in range(y-1, y+2):
            if x == i and y == j:
                continue
            tmp = (i, j)
            ret.append(tmp)
    return ret


print [(1, 1), (1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2), (3, 3)] == cartesian_neighbor(2, 2)



