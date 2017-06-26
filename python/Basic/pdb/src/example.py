import pdb

def calc(operator, num1, num2):
    pdb.set_trace()
    if operator is '+':
        return num1 + num2
    elif operator is '-':
        return num1 - num2
    elif operator is '*':
        return num1 * num2
    else:
        return num1 / num2

pdb.set_trace()

num1 = 100
num2 = 5

result = calc('*', num1, num2)

print result
