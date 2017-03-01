sample = {
    'name': 'greenfrog',
    'age': 36
}

# print(sample.get('test'))

value = sample.get('test', ("There is no value of '%s' key." % 'test'))
print(value)
