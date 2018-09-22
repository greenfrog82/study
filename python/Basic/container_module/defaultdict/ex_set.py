from collections import defaultdict

s = [('red', 1), ('blue', 2), ('red', 3), ('blue', 4), ('red', 1), ('blue', 4)]
d = defaultdict(set)

for k, v in s:
    d[k].add(v)

print d.items()  # [('blue', set([2, 4])), ('red', set([1, 3]))]

