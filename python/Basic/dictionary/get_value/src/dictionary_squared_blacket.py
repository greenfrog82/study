sample = {
    'name': 'greenfrog',
    'age': 36
}

# 잘못 사용한 예.
# print(sample['test'])

#예외 처리한 코드

try:
    print(sample['test'])
except KeyError:
    print("There is no value of '%s' key." % 'test')
