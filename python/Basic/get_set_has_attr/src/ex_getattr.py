class Person:
    name = 'dummy'

person = Person()

print 'Age of this person is %d' % getattr(person, 'age', 0)

try:
    age = getattr(person, 'age')
except AttributeError as ex:
    print 'Age of this person is 0'