random_string = ' this is good'

# Leading whitepsace are removed
print(random_string.rstrip())

# Argument doesn't contain 'd'
# No characters are removed.
print(random_string.rstrip('si oo'))

print(random_string.rstrip('sid oo'))

website = 'www.programiz.com/'
print(website.rstrip('m/.'))
