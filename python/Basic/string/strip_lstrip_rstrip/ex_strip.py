string = ' xoxo love xoxo   '

# Leading whitepsace are removed
print('|%s|' % string.strip())

print('|%s|' % string.strip(' xoxoe'))

# Argument doesn't contain space
# No characters are removed.
print('|%s|' % string.strip('sti'))

string = 'android is awesome'
print('|%s|' % string.strip('an'))