from string import maketrans

trans_table = maketrans('aeiou', '12345')
origin = 'greenfrog'
print origin.translate(trans_table)
print origin
