from collections import defaultdict

defaultdic = defaultdict(list)

a_value = defaultdic['a']
b_value =  defaultdic['b']

print id(a_value)
print id(defaultdic['a'])

# dic = {}

# print dic['a']