class Person:
    name = 'dummy'

person = Person()

if hasattr(person, 'name'):
    print 'Person has a name attribtue.'

if not hasattr(person, 'age'):
    print 'Person has not a age attribute.'