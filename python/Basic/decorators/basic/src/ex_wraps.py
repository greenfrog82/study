# def sample_decorator(func):
#     def wrapper(*args, **kwargs):
#         print 'Begin decorator'
#         func()
#         print 'End decorator'
#     return wrapper
#
# @sample_decorator
# def test_func():
#     """This is a test function for decorator."""
#     print 'tester'
#
# print test_func.__name__
# print test_func.__doc__

from functools import wraps

def sample_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print 'Begin decorator'
        func()
        print 'End decorator'
    return wrapper

@sample_decorator
def test_func():
    """This is a test function for decorator."""
    print 'tester'

print test_func.__name__
print test_func.__doc__
