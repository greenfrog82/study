def factorial(n):
    if 1 >= n:
        return 1
    else:
        return n * factorial(n-1)

print(120 == factorial(5))

n = 5
ret = 1 
for n in range(1, n+1):
    ret *= n

print(120 == ret)