def invert(lst):
    return [-num for num in lst]

print(invert([1, 2, 3, 4, 5]) == [-1, -2, -3, -4, -5])
print(invert([1, -2, 3, -4, 5]) == [-1, 2, -3, 4, -5])
print(invert([]) == [])
