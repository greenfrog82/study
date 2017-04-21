def sample_decorator(func):
    def wrapper(*args, **kwargs):
        print 'Begin decorator'
        func()
        print 'End decorator'
    return wrapper

# def test_func():
#    """This is a test function for decorator."""
#     print 'tester'
#
# test_decorator = sample_decorator(test_func)
# test_decorator()

@sample_decorator
def test_func():
    """This is a test function for decorator."""
    print 'tester'

test_func()
