# [8kyu A Needle in the Haystack](https://www.codewars.com/kata/a-needle-in-the-haystack)

Can you find the needle in the haystack?

Write a function findNeedle() that takes an array full of junk but containing one "needle"

After your function finds the needle it should return a message (as a string) that says:

"found the needle at position " plus the index it found the needle, so:

Python, Ruby & Elixir

```python
find_needle(['hay', 'junk', 'hay', 'hay', 'moreJunk', 'needle', 'randomJunk'])
```
JavaScript & TypeScript
```javascript
findNeedle(['hay', 'junk', 'hay', 'hay', 'moreJunk', 'needle', 'randomJunk'])
```
Java

```java
findNeedle(new Object[] {"hay", "junk", "hay", "hay", "moreJunk", "needle", "randomJunk"})
should return
```

"found the needle at position 5"


## My Solution

```python
def find_needle(haystack):
    for idx, what in enumerate(haystack):
        if 'needle' == what:
            return 'found the needle at position %d' % idx
```
```python
def find_needle(haystack):
    return 'found the needle at position %d' % haystack.index('needle')
```
