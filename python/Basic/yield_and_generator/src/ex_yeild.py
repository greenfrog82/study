def gen_num():
    print 'gen_num yield 1\n'
    yield 1
    print 'gen_num yield 2\n'
    yield 2 
    print 'gen_num yield 3\n'
    yield 3 
    print 'gen_num yield 4, 5, 6\n'
    yield (4, 5, 6,)

for item in gen_num():
    print 'for %s\n' % str(item)
