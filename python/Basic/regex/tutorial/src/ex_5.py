import re

# match_obj = re.search(r'([\w\.-]+)@([\w\.-]+)', 'test@test.com')
match_obj = re.search(r'([\w\.-]+)@([\w\.-]+)', '_.....@test.com')

print("All matched words : ", match_obj.group())

for idx, group in enumerate(match_obj.groups()):
    print('Group %d : %s' % (idx, group))