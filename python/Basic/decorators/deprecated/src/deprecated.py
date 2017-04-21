import warnings
from functools import wraps

# This function is like 'deprecated annotation' of java or c#.
# If you've found some unnecessary functions any more, you need to add this decorator above that functions.
# http://code.activestate.com/recipes/391367-deprecated/
def deprecated(msg=None):
    def _deprecated(func):
        """
        This is a decorator which can be used to mark functions
        as deprecated. It will result in a warning being emmitted
        when the function is used.
        """
        @wraps(func)
        def wrapper(*args, **kwargs):
            warnings.simplefilter('always', DeprecationWarning)#turn off filter

            warning_msg = None

            if msg is None:
                warning_msg = "Call to deprecated function {}.".format(func.__name__)
            else:
                warning_msg = "Call to deprecated function {}.\n{}.".format(func.__name__, msg)

            warnings.warn(warning_msg, category=DeprecationWarning, stacklevel=2)

            warnings.simplefilter('default', DeprecationWarning) #reset filter

            return func(*args, **kwargs)
        return wrapper
    return _deprecated


# === Examples of use ===


@deprecated()
def some_old_function(x, y):
    return x + y

class SomeClass:
    @deprecated('You do not use this method anymore')
    def some_old_method(self, x, y):
        return x + y


some_old_function(1, 2)

obj = SomeClass()
obj.some_old_method(1, 2)

print SomeClass.some_old_method.__name__
