def summation(num):
    return sum(x for x in range(1, num+1))

print(summation(1) == 1)
print(summation(8) == 36)