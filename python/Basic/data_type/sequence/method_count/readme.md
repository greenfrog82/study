# count method

## Description

sequence data type의 count method는 인자로 전달받은 값 또는 객체가 sequence data type의 목록에 존재하는 개수를 반환한다.

## Syntax

```python
sequence.count(param)
```

### Parameters

* **param** - 목록에서 몇개가 존재하는지 찾기 위한 대상

### Return Value

param으로 전달받은 값 또는 객체가 목록에 존재하는 개수

## Example

```python
lst = [123, 'test', 'test', 123]
print 'Count for test in list : ', lst.count('test')

tp = ('test', 123, 123, 'test')
print 'Count for test in tuple : ', tp.count('test')

str = '123 test 123 test'
print 'Count for test in string : ', str.count('test')
```

### Result

```
Count for test in list :  2
Count for test in tuple :  2
Count for test in string :  2
```

## 참조

* [3. Strings, lists, and tuples](http://www.openbookproject.net/books/bpp4awd/ch03.html)
* [Python List count() Method](https://www.tutorialspoint.com/python/list_count.htm)
