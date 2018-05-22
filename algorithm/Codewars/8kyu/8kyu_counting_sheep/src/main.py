def count_sheeps(arrayOfSheeps):
    return len([sheep for sheep in arrayOfSheeps if sheep])

array1 = [True,  True,  True,  False,
          True,  True,  True,  True,
          True,  False, True,  False,
          True,  False, False, True,
          True,  True,  True,  True,
          False, False, True,  True]

print count_sheeps(array1) == 17
