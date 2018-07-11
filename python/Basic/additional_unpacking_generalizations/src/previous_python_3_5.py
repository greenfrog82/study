# in case of dictionary
print('-----------------------------')
print('dictionary')
print('-----------------------------')

origin_dict = {'a':1, 'b':2}
origin_dict.update({'c':3})
print('* using udpate method :', origin_dict)

# in case of list
print('-----------------------------')
print('list')
print('-----------------------------')

arr = [1, 2, 3]
arr += [4]
print('* using += :', arr)

from itertools import chain

print('* using itertools.chain with list : ', list(chain(arr, [5, 6])))