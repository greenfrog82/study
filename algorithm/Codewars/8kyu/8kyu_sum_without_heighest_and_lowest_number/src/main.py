def sum_array(arr):
    if not arr or 3 > len(arr):
        return 0

    return sum(sorted(arr)[1:len(arr)-1])

print sum_array(None) == 0
print sum_array([]) ==  0

print sum_array([3]) ==  0
print sum_array([-3]) ==  0

print sum_array([3, 5]) ==  0
print sum_array([-3, -5]) ==  0

print sum_array([6, 2, 1, 8, 10]) ==  16
print sum_array([6, 0, 1, 10, 10]) ==  17
print sum_array([-6, -20, -1, -10, -12]) ==  -28
print sum_array([-6, 20, -1, 10, -12]) ==  3
