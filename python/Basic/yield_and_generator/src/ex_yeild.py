def gen_num():
    print 'gen_num yield 1\n'
    yield 1
    print 'gen_num yield 2\n'
    yield 2 
    print 'gen_num yield 3\n'
    yield 3 
    print 'gen_num yield 4, 5, 6\n'
    yield (4, 5, 6,)


gen = gen_num()

for item in gen:
    print '1. for %s\n' % str(item)

for item in gen:
    print '2. for %s\n' % str(item)
