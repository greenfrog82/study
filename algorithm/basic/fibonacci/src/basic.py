def fibonacci(n):
    print('call')
    if 1 >= n:
        return 1
    else:
        return fibonacci(n-2) + fibonacci(n-1)

print(fibonacci(5))