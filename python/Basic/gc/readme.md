# Python Garbage Collector

Python의 Garbase Collection은 기본적으로 **Reference Counting** 방식과 **Generational Garbage Collection** 방식을 함께 사용한다.  
**Reference Counting** 방식의 경우 직관적이고 레퍼런스 카운트가 0이되는 순간 적시에 메모리를 삭제할 수 있어서 효율적이지만, **Reference Cycle**을 감지할 수 없기 때문에 **Generational Garbage Collection**을 통해 이를 보안한다.  

Python의 Garbage Collection은 **Reference Counting**이 기본이고 이는 옵션이 아니다. 하지만 **Generational Garbase Collection**의 경우 옵션을 통해 사용유무를 결정할 수 있다. 

## Reference Counting

**Reference Counting** 방식은 Python이 특정 object를 메모리에 유지할 것인지 아닌지에 대해서 결정하는 기본 방식이다.  

**Reference Count**가 증가하는 경우는 변수가 특정 object를 할당하고 있는 경우인데, 일반적으로 다음과 같다. 

* 변수에 해당 object를 할당하는 경우
* 함수의 파라메터로 object를 넘기는 경우 
* 자료구조에 object를 저장하는 경우 

반대로 **Reference Count**가 감소하는 경우는 특정 object를 할당하고 있던 변수가 더 이상 해당 object를 할당하지 않는 경우인데, 다음과 같다.  

* 특정 object를 할당하고 있는 변수에 None을 할당하는 경우 
* 특정 Block이 종료되는 경우 
* 함수 호출이 끝나는 경우 
* 특정 object를 저장하고 있는 자료구조가 삭제되는 경우 

**Reference Count**의 경우 **sys.getrefcount** 함수를 통해 언제든지 확인 할 수 있다. 

['How to show reference count'](./src/how_to_show_reference_count.py)
```python
foo = []

# 2 references, 1 from the foo var and 1 from getrefcount
print(sys.getrefcount(foo))

def bar(a):
    # 4 references
    # from the foo var, function argument, getrefcount and Python's function stack
    print(sys.getrefcount(a))

bar(foo)
# 2 references, the function scope is destroyed
print(sys.getrefcount(foo))
```

이 방식의 경우, 특정 object를 참조하는 Reference Count를 관리하여 Reference Count가 0이 되는 적시에 object를 메모리에서 삭제한다. 
**적시**에 메모리를 삭제한다는 효율적인 장점은 있지만, Multi-Threading 환경에서 Reference Count을 방지하기 위한 Lock 관리 그리고 이로 인한 성능 저하 그리고 아예 메모리를 해제할 수 없게하는 **Circular Reference**까지 많은 문제를 안고 있다.  
따라서 Python Community에서는 좀 더 현대적인 Garbage Collection Algorithm을 적용하자는 목소리가 끊이지 않는 상황이다.  

## Generational garbage collector

**Reference Counting** 방식의 경우 다음과 같이 **refereence cycle**이 존재하는 경우 이를 감지하지 못한다.  

['Problem of ther reference counting with reference cycle'](./src/problem_reference_counting_with_refer_cycle.py)

```python
import gc

# We are using ctypes to access our unreachable objects by memory address.
class PyObject(ctypes.Structure):
    _fields_ = [("refcnt", ctypes.c_long)]


gc.disable()  # Disable generational gc

lst = []
lst.append(lst)

# Store address of the list
lst_address = id(lst)

# Destroy the lst reference
del lst

object_1 = {
object_2 = {}
object_1['obj2'] = object_2
object_2['obj1'] = object_1

obj_address = id(object_1)

# Destroy references
del object_1, object_2

# Uncomment if you want to manually run garbage collection process 
# gc.collect()

# Check the reference count
print(PyObject.from_address(obj_address).refcnt)
```

때문에 Python 1.5버전에서 소개 된 [gc module](https://docs.python.org/3.6/library/gc.html)(Generational garbage collector)를 통해서 이러한 문제를 해결한다.   
Reference Count 



### When does the generational GC trigger





## Reference

* [Garbage collection in Python: things you need to know](https://rushter.com/blog/python-garbage-collector/)
* [CPython memory management](https://medium.com/python-pandemonium/cpython-memory-management-479e6cd86c9)
* [Tricky Python I : Memory Management for Mutable & Immutable Objects](https://medium.com/@tyastropheus/tricky-python-i-memory-management-for-mutable-immutable-objects-21507d1e5b95)