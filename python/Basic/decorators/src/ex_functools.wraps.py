from functools import wraps

def logged(func):
    @wraps(func)
    def with_logging(*args, **kwargs):
        print func.__name__ + " was called"
        return func(*args, **kwargs)
    return with_logging

@logged
def f(x):
    """does some math"""
    return x + x * x

# f(10)

# f = logged(f)

print f.__name__
print f.__doc__
