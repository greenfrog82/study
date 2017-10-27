def perform(s):

    groups = []
    for value in s:
        if groups and groups[-1][0] == value:
            groups[-1].append(value)
        else:
            groups.append([value])

    pairs = 0

    for i, group in enumerate(groups[1:], start=1):
        pairs += min(len(groups[i-1]), len(group))

    return pairs

import sys

n = perform(sys.argv[1])

print n, sys.argv[1]
