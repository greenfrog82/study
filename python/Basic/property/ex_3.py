class Person(object):
    def __init__(self):
        self._name = 'dummy'

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, name):
        if not isinstance(name, str):
            raise ValueError('name must be string type.')
        self._name = name

person = Person()

try:
    person.name = 'greenfrog'
    print(person.name)
    person.name = 123
    print(person.name)
except ValueError as e:
    print(e)