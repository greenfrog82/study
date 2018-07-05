import sys

a = []
b = a
print(sys.getrefcount(a))
print(sys.getrefcount(b))