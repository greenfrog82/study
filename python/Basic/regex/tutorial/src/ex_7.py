import re

# re.match
print('------------------------------------------------')
print('re.match')
print('------------------------------------------------')
matched_str = re.match(r'Cookie', 'This is a Cookie')
print("'re.match('Cookie', 'This is a Cookie') : '", matched_str)
matched_str = re.match(r'Cookie', 'Cookie is very good').group()
print("'re.match('Cookie', 'Cookie is very good') : '", matched_str)

# re.search
print('------------------------------------------------')
print('re.search')
print('------------------------------------------------')
matched_str = re.search(r'Cookie', 'This is a Cookie').group()
print("'re.search('Cookie', 'This is a Cookie') : '", matched_str)

# findall
print('------------------------------------------------')
print('re.findall')
print('------------------------------------------------')
email_address = "Please contact us at: support@datacamp.com, xyz@datacamp.com"

# 'addresses' is a list that stores all the possible match
addresses = re.findall(r'[\w\.-]+@[\w\.-]+', email_address)
print(addresses)
for address in addresses:
    print(address)

print(re.search(r'[\w\.-]+@[\w\.-]+', email_address).group())

# sub
print('------------------------------------------------')
print('re.sub')
print('------------------------------------------------')
email_address = "Please contact us at: xyz@datacamp.com, test@test.com"
# email_address = "test"
new_email_address = re.sub(r'([\w\.-]+)@([\w\.-]+)', r'support@datacamp.com', email_address)
print(new_email_address)
print(email_address)


# compile
print('------------------------------------------------')
print('re.compile')
print('------------------------------------------------')
pattern = re.compile(r'Cookie')
matched_str = pattern.search('This is a Cookie').group()
print("'pattern.search('This is a Cookie') : '", matched_str)
