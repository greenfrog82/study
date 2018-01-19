print '--------------------------------------'
print 'list'
print '--------------------------------------'

values = [1, 2, 3]

print '3 in values : ', 3 in values             # True
print '4 in values : ', 4 in values             # False
print '3 not in values : ', 3 not in values     # False
print '4 not in values : ', 4 not in values     # True

print '--------------------------------------'
print 'tuple'
print '--------------------------------------'

values = (1, 2, 3)

print '3 in values : ', 3 in values             # True 
print '4 in values : ', 4 in values             # False
print '3 not in values : ', 3 not in values     # False 
print '4 not in values : ', 4 not in values     # True

print '---------------------------------------'
print 'dictionary'
print '---------------------------------------'

values = {
    'name': 'greenfrog',
    'job': 'programmer',
}

print 'name in values : ', 'name' in values             # True
print 'hobby in values : ', 'hobby' in values           # False
print 'name not in values : ', 'name' not in values     # False 
print 'hobby not in values : ', 'hobby' not in values   # True 

print '---------------------------------------'
print 'string'
print '---------------------------------------'

str = 'greenfrog'

print 'g in str : ', 'g' in str             # True
print 'a in str : ', 'a' in str             # False
print 'g not in str : ', 'g' not in str     # False
print 'a not in str : ', 'a' not in str     # True