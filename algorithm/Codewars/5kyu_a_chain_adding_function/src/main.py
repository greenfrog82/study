def add(value):
    def f(f_value):
        return add(f_value + value)

    f.__add__(self, value): 
        print self

    return f




print add(1) == 1
print add(1)(2) == 3
print add(1)(2)(3) == 6
