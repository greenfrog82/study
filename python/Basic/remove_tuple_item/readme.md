# How to remove item in tuple

Python에서 tuple과 list는 둘 다 원소를 저장하기 위한 collection이다. 하지만 한 가지 다른점은 tuple은 immutable하고 list mutable하다는 것이다. 

그러면 tuple의 특정 원소를 삭제하고 싶으면 어떻게 해야할까?
tuple을 list로 형변환하여 원하는 원소를 삭제한 후 tuple로 다시 형변환하는 방법을 사용한다. 

```python
numbers = (1, 2, 3)

lst_numbers = list(numbers)
lst_numbers.remove(2)

numbers = tuple(lst_numbers)

print numbers
```


## Reference

* [Python Exercise: Remove an item from a tuple](https://www.w3resource.com/python-exercises/tuple/python-tuple-exercise-12.php)
* [Python: difference between list and tuple](https://www.hacksparrow.com/python-difference-between-list-and-tuple.html)