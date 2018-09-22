from collections import defaultdict

class default_factory_by_class(object):
    @property
    def factory_name(self):
        return self._name

    @factory_name.setter
    def factory_name(self, value):
        self.name = value


dd = defaultdict(default_factory_by_class)
dd['a'].name = 100
print dd['a'].name # 100


def default_factory_by_function():
    return 'default_factory_by_function'

dd = defaultdict(default_factory_by_function)
print dd['a'] # default_factory_by_function

dd = defaultdict(int)
print dd['a'] # 0
