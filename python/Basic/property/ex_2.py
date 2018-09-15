class Person:
    def __init__(self):
        self._name = 'dummy'

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, name):
        self._name = name

person = Person()
print 'Before calling name property :', person.name
person.name = 'greenfrog'
print 'After calling name property :', person.name