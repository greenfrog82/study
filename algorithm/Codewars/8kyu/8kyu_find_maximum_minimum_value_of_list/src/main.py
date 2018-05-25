def min(arr):
    return sorted(arr)[0]

def max(arr):
    return sorted(arr)[-1] 

print(min([-52, 56, 30, 29, -54, 0, -110]) == -110)
print(min([42, 54, 65, 87, 0]) == 0)
print(min([1, 2, 3, 4, 5, 10]) == 1)
print(min([-1, -2, -3, -4, -5, -10]) == -10)
print(min([9]) == 9)

print(max([-52, 56, 30, 29, -54, 0, -110]) == 56)
print(max([4, 6, 2, 1, 9, 63, -134, 566]) == 566)
print(max([5]) == 5)
print(max([534, 43, 2, 1, 3, 4, 5, 5, 443, 443, 555, 555]) == 555)
print(max([9]) == 9)
