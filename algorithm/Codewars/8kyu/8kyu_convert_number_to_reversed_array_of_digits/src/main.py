def digitize(n):
    return [int(num) for num in str(n)[::-1]]

print digitize(348597) == [7, 9, 5, 8, 4, 3]