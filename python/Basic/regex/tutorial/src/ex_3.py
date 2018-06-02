import re

# .
print('----------------------------------------------------')
print('.')
print('----------------------------------------------------')
matched_str = re.search(r'Co.k.e', 'Cookie').group()
print("re.search(r'Co.k.e', 'Cookie') : ", matched_str)
matched_str = re.search(r'a.b.c.d.e', 'a1b c@d\te').group()
print("re.search(r'a.b.c.d.e', 'a1b c@d\te') : ", matched_str)
matched_str = re.search(r'.', '\n')
print(r"re.search(r'.', '\n') : ", matched_str)

# \w
print('----------------------------------------------------')
print('\w')
print('----------------------------------------------------')
matched_str = re.search(r'Co\wk\we', 'Cookie').group()
print("re.search(r'Co\wk\we', 'Cookie') : ", matched_str)
matched_str = re.search(r'\w\w\w', 'a1_').group()
print("re.search(r'\w\w\w', 'a1_') : ", matched_str)
matched_str = re.search(r'\w', '@')
print("re.search(r'\w', '@') : ", matched_str)
matched_str = re.search(r'\w', '\n')
print(r"re.search(r'\w', '\n') : ", matched_str)

# \W
print('----------------------------------------------------')
print('\W')
print('----------------------------------------------------')
matched_str = re.search(r'C\Wk\We', 'C@k\te').group()
print(r"re.search(r'C\Wk\We', 'C@k\te') : ", matched_str)
matched_str = re.search(r'\W', 'a')
print("re.search(r'\W', 'a') : ", matched_str)
matched_str = re.search(r'\W', '0')
print("re.search(r'\W', '0') : ", matched_str)
matched_str = re.search(r'\W', '_')
print("re.search(r'\W', '_') : ", matched_str)

# \s
print('----------------------------------------------------')
print('\s')
print('----------------------------------------------------')
matched_str = re.search(r'a\sb\sc\sd\n', 'a b\tc\rd\n').group()
print('\\s\t:', matched_str)
matched_str = re.search(r'\s', 'a')
print('\\s\t:', matched_str)
matched_str = re.search(r'\s', '1')
print('\\s\t:', matched_str)
matched_str = re.search(r'\s', '@')
print('\\s\t:', matched_str)

# \S
matched_str = re.search(r'\S\S\S\S', 'a1@_').group()
print('\\S\t:', matched_str)
matched_str = re.search(r'\S', ' ')
print('\\S\t:', matched_str)
matched_str = re.search(r'\S', '\t')
print('\\S\t:', matched_str)
matched_str = re.search(r'\S', '\r')
print('\\S\t:', matched_str)
matched_str = re.search(r'\S', '\n')
print('\\S\t:', matched_str)

# \d
matched_str = re.search(r'C\d\dkie', 'C00kie').group()
print('\\d\t:', matched_str)

# ^
matched_str = re.search(r'^Eat cake', 'Eat cake').group()
print('^\t:', matched_str)
matched_str = re.search(r'^cake', 'Eat cake')
print('^\t:', matched_str)
