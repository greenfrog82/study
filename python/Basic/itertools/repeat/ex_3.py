from itertools import repeat

lst = list(map(pow, range(10), repeat(2)))

print(lst)