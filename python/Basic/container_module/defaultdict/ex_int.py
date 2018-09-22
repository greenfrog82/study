from collections import defaultdict

s = 'mississippi'
d = defaultdict(int) 

for k in s:
    d[k] += 1

print d.items()  # [('i', 4), ('p', 2), ('s', 4), ('m', 1)]

