# in case of dictionary
print('-----------------------------')
print('dictionary')
print('-----------------------------')

origin_dict = {'a':1, 'b':2}
print('* using unpacking dictionary :', {**origin_dict, 'c':3})

dict_1 = {'a':1, 'b':2}
dict_2 = {'d':4, 'e':5}
print('* using unpacking two dictioanry :', {**dict_1, 'd':4, **dict_2})

# in case of list
print('-----------------------------')
print('list')
print('-----------------------------')

arr = [1, 2, 3]
print('* using unpacking list :', [*arr, 4])

arr_1 = [1, 2, 3]
arr_2 = [5, 6, 7]
print('* using unpacking two list :', [*arr_1, 4, *arr_2])
