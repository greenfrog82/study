# -*- coding:utf-8 -*-

import re

address = u'Custom XXX XXXX XXX(YYYY)(52484)(2015 - 01 - 08 21: 18: 31.061811)'

res = re.search(r'(?<=^Custom ).*?(?=\()', address)
print res.group()


address = address.split('(')[0].replace('Custom', '').strip()
print address

# https://superuser.com/questions/1268481/regex-to-lookahead-user-name-and-match-the-word-behind-until-the-end-of-line
# https://www.regular-expressions.info/lookaround.html

