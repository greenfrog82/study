import re

# .
matched_str = re.search(r'Co.k.e', 'Cookie').group()
print('.\t:', matched_str)
matched_str = re.search(r'a.b.c.d.e', 'a1b c@d\te').group()
print('.\t:', matched_str)
matched_str = re.search(r'.', '\n')
print('.\t:', matched_str)

# \w
matched_str = re.search(r'Co\wk\we', 'Cookie').group()
print('\\w\t:', matched_str)
matched_str = re.search(r'\w\w\w', 'a1_').group()
print('\\w\t:', matched_str)
matched_str = re.search(r'\w', '@')
print('\\w\t:', matched_str)
matched_str = re.search(r'\w', '\n')
print('\\w\t:', matched_str)

# \W
matched_str = re.search(r'C\Wk\We', 'C@k\te').group()
print('\\W\t:', matched_str)
matched_str = re.search(r'\W', 'a')
print('\\W\t:', matched_str)
matched_str = re.search(r'\W', '0')
print('\\W\t:', matched_str)
matched_str = re.search(r'\W', '_')
print('\\W\t:', matched_str)

# \s
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

