class Person:
    name = 'dummy'

person = Person()

setattr(person, 'age', 37)
print person.age

setattr(person, 'name', 'greenfrog')
print person.name

person.job = 'Programmer'
print person.job