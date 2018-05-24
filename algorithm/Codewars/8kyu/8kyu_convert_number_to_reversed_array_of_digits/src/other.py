def digitize(n):
    return map(int, str(n)[::-1])

print digitize(348597) == [7, 9, 5, 8, 4, 3]
