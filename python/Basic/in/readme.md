# About in keyword

**in** keyword는 list, tuple, string 타입 변수의 값에 특정 원소의 존재여부를 확인하거나 dictionary 타입 변수의 값에 특정 key의 존재여부를 확인하는데 사용한다. 

## List Example

```python
values = [1, 2, 3]

print '3 in values : ', 3 in values             # True
print '4 in values : ', 4 in values             # False
print '3 not in values : ', 3 not in values     # False
print '4 not in values : ', 4 not in values     # True
```

## Dictionary Example

```python
values = {
    'name': 'greenfrog',
    'job': 'programmer',
}

print 'name in values : ', 'name' in values             # True
print 'hobby in values : ', 'hobby' in values           # False
print 'name not in values : ', 'name' not in values     # False 
print 'hobby not in values : ', 'hobby' not in values   # True 
```

## String Example

```python
str = 'greenfrog'

print 'g in str : ', 'g' in str              # True
print 'a in str : ', 'a' in str              # False
print 'g not in str : ', 'g' not in str      # False
print 'a not in str : ', 'a' not in str      # True
```

## 참조

* [Fastest way to check if a value exist in a list Ask Question](http://stackoverflow.com/questions/7571635/fastest-way-to-check-if-a-value-exist-in-a-list)
* [Use and meaning of “in” in an if statement?
](https://stackoverflow.com/questions/19775692/use-and-meaning-of-in-in-an-if-statement)
