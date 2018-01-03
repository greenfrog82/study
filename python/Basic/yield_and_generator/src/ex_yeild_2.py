def gen_number():
    lst = []
    for i in range(1, 5):
        for j in range(1, 5):
            res = i * j 
            
            # lst.append(res)
            print 'gen_number [%d][%d] = %d' % (i, j, res)
            yield res
    
    # yield lst
            
gen = gen_number()

print 'After call gen_number()'

for item in gen:
    print 'Main loop : %s' % str(item)

