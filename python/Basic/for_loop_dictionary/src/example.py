from data import sample

# 방법 1.
for key in sample:
    value = sample[key]
    print('sample[' + key + '] = ' + str(value))
    
# 방법 2

# Python 2
# for key, value in sample.iteritems():
    # print(key + ' : ' + str(value))

# Python 3
for key, value in sample.items():
    print(key + ' : ' + str(value))

# runtime 에러
for key, value in sample.items():
    # sample['test'] = 'test value'
    sample['name'] = 'treefrog' 
    print(key + ' : ' + str(value))