class Person:
    def __init__(self):
        self._name = 'dummy'

    def get_name(self):
        return self._name

    def set_name(self, name):
        self._name = name

person = Person()
print 'Before calling set_name :', person.get_name()
person.set_name('greenfrog')
print 'After calling get_name :', person.get_name()
