from functools import wraps

def decorator_1(func):
    @wraps(func)
    def wrapper_1(*args, **kwargs):
        print 'Begin decorator_1'
        func(*args, **kwargs)
        print 'End decorator_1'
    return wrapper_1

def decorator_2(func):
    @wraps(func)
    def wrapper_2(*args, **kwargs):
        print 'Begin decorator_2'
        func(*args, **kwargs)
        print 'End decorator_2'
    return wrapper_2

@decorator_1
@decorator_2
def test():
    print 'I am test function of python.'


test()
