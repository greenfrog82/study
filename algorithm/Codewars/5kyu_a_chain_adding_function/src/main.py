def add(n):
    f = lambda x: add(x + n)

    return f

print add(1)
# print add(1) == 1
# print add(1)(2) == 3
# print add(1)(2)(3) == 6