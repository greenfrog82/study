# [Compress/Encode a Message with RLE (Run Length Encoding)](https://www.codewars.com/kata/compress-slash-encode-a-message-with-rle-run-length-encoding)

Run Length Encoding is used to compress data. RLE works like this: characters = "AAAALOTOOOOFTEEEEXXXXXXT" then the encoding will store AAAA = A4 and L1 So all together:

encode("AAAALOTOOOOFTEEEEXXXXXXT") == "A4L1O1T1O4F1T1E4X6T1"
# or
encode("HELLO WORLD") == "H1E1L2O1 1W1O1R1L1D1"
# or
encode("FOO+BAR") == "F1O2+1B1A1R1"

as you can see, its not always as efficient, but with some specific data it works!

## My Solution

```python
def encode(inp):
    final = ''

    tmp = inp[0]
    cnt = 1
    for ch in inp[1:]:
        if ch != tmp:
            final += '%s%d' % (tmp, cnt)
            tmp = ch
            cnt = 1
        else:
            cnt += 1

    final += '%s%d' % (tmp, cnt)
    return final

print 'H1I3T4H1E2R4' == encode('HIIITTTTHEERRRR')
```

## Other Solution

```python
from itertools import groupby

def encode(s):
    return ''.join(k + str(sum(1 for _ in g)) for k, g in groupby(s))
```