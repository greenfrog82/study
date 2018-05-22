def basic_op(op, a, b):
    return {'+': a+b, '-': a-b, '*': a*b, '/':a/b}.get(op)
    
print(basic_op('+', 4, 7) == 11)
print(basic_op('-', 15, 18) == -3)
print(basic_op('*', 5, 5) == 25)
print(basic_op('/', 49, 7) == 7)
