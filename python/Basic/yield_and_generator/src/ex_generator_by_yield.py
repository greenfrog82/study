def number_generator():
    for num in range(5):
        yield num

gen_num = number_generator()

print type(gen_num)

print 'First iterating gen_num'

for num in gen_num:
    print num

print 'Second iterating gen_num'

for num in gen_num:
    print num
