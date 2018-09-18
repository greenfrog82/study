division = 1

try:
    4 / division
except ZeroDivisionError as e:
    print 'ZeroDivisionError'
else:
    print 'There is no error.'
finally:
    print 'The End'
  
# --------------------------------------

try:
    f = open('foo.txt', 'r')
except FileNotFoundError as e:
    print(str(e))
else:
    data = f.read()
    f.close()
