from functools import wraps

def sample_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        func(*args, **kwargs)
    return wrapper

@sample_decorator
def test(name, age):
    print name, age
    
test(name='greenfrog', age=37)
test(1, 2)