from functools import wraps

def memo(func):
    repo = {}
    @wraps(func)
    def wrapper(n):
        if not n in repo:
            repo[n] = func(n)
        return repo[n]
    return wrapper

@memo
def fibonacci(n):
    print('call')
    if 1 >= n:
        return 1
    else:
        return fibonacci(n-2) + fibonacci(n-1)

print(fibonacci(5))