arr = [1, 2]

arr.extend((3, 4))
arr.extend([5, 6])
arr.extend({'test':'greenfrog', 'name':100}.values())

#arr.extend(100)

print arr
