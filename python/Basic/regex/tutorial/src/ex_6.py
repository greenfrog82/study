import re

heading = r'<H1>HEADER</H1>'

# Greedy
matched_str = re.match(r'<.*>', heading).group()
print(r"re.match(r'<.*>', '<H1>HEADER</H1>') : ", matched_str)

# Non-Greedy
matched_str = re.match(r'<.*?>', heading).group()
print(r"re.match(r'<.*?>', '<H1>HEADER</H1>') : ", matched_str)

