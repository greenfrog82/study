class MyDict(dict):
    """A normal dict, that is always created with an "initial" key"""
    def __init__(self):
        self["initial"] = "some data"

d = MyDict()
print 'd = MyDict()'
print 'type(d) == dict : ', type(d) == dict    # False
print 'type(d) == MyDict : ', type(d) == MyDict  # True
print ''

d = dict()
print 'd = dict()'
print 'type(d) == dict : ', type(d) == dict    # True
print 'type(d) == MyDict : ', type(d) == MyDict  # False
print ''

d = MyDict()
print 'd = MyDict()'
print 'isinstance(d, MyDict) : ', isinstance(d, MyDict)  # True
print 'isinstance(d, dict) : ', isinstance(d, dict)  # True
print ''

d = dict()
print 'd = dict()'
print 'isinstance(d, MyDict) : ', isinstance(d, MyDict) # False
print 'isinstance(d, dict) : ', isinstance(d, dict) # True
