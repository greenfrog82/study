class Person:
    name = 'dummy'

person = Person()

setattr(person, 'age', 37)
print person.age