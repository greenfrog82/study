from functools import wraps

def sample_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print func.__name__ + ' was called'
        return func(*args, **kwargs)
    return wrapper

@sample_decorator
def test():
    """This is test function for decorator."""
    print 'tester'

print test.__name__
print test.__doc__
test()
