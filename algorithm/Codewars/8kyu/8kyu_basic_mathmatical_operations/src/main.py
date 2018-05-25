def basic_op(operator, value1, value2):
    return eval('%d%s%d' % (value1, operator, value2))
    
print(basic_op('+', 4, 7) == 11)
print(basic_op('-', 15, 18) == -3)
print(basic_op('*', 5, 5) == 25)
print(basic_op('/', 49, 7) == 7)
