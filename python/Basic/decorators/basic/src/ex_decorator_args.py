from functools import wraps

def sample_decorator(msg):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            print 'Begin decorator'
            print 'Message : %s' % msg
            func(*args, **kwargs)
            print 'End decorator'
        return wrapper
    return decorator

@sample_decorator('This decorator is test for decorator which is accepted to pass arguments.')
def test():
    print 'tester'

test()
