def is_divisible(n, x, y):
    return not n % x and not n % y

print(is_divisible(3, 3, 4) == False)
print(is_divisible(12, 3, 4) == True)
print(is_divisible(8, 3, 4) == False)
print(is_divisible(48, 3, 4) == True)
