# append vs extend

## 개요

 array 클래스의 append와 extend 메소드에 대해서 알아보자.

## append(x)

append 메소드는 값을 인자로 받아서 배열의 마지막에 추가하는 메소드이다.

다음 예제를 보자. 1, 2를 원소로 갖은 array에 3을 append하였다.

```python
arr = [1, 2]

arr.append(3)

print arr
```

결과는 다음과 같다.

```
[1, 2, 3]
```

위 예제에 이어서 array를 추가한 후 출력해보자.

```python
arr.append([4, 5])

print arr
```

결과는 다음과 같이 배열[4, 5]가 하나의 원소로 arr 변수가 가리키는 배열의 뒤에 추가되었다. 튜플, 딕셔너리 역시 마찬가지 형태로 추가 된다.

```
[1, 2, 3, [4, 5]]
```

## extend

iterable 데이터를 인자로 전달 받아서 배열의 뒤에 추가한다.

이때, iterable 데이터가 아닌 값을 인자로 전달하면 TypeError가 발생하는데 다음 예제를 보자.

```python
arr = [1, 2]
arr.extend(3)
```

위 예제를 결과는 다음과 같다.

```
Traceback (most recent call last):
  File "/Users/greenfrog/develop/study/python/Basic/extends_vs_append_in_array/src/ex_extend.py", line 7, in <module>
    arr.extend(100)
TypeError: 'int' object is not iterable
```

이번에는 iterable 데이터를 인자로 전달해보자. append와의 차이를 볼 수 있다.

```python
arr = [1, 2]

arr.extend([3, 4])

print arr
```

결과는 다음과 같다. 결과를 보면 append 메소드와 확연히 다른 것을 알 수 있다. **extend 메소드를 사용하면 iterable 데이터의 원소가 배열의 뒤에 추가된다.**

```
[1, 2, 3, 4]
```

이번에는 튜플을 추가해보자.

```python
arr.extend((5, 6))
```

결과는 배열을 인자로 전달했을 때와 동일하게 튜플의 원소가 배열의 뒤에 추가된다.

```
[1, 2, 3, 4, 5, 6]
```

그렇다면, 딕셔너리의 경우는 어떤식으로 추가될까? 딕셔너리를 추가해보자.

```python
arr.extend({'test':'greenfrog', 'name':100})
```

결과는 다음과 같은데, 딕셔너리의 key만이 추가되는 것을 확인할 수 있다.

```
[1, 2, 3, 4, 5, 6, 'test', 'name']
```

## 결론

append 메소드는 인자로 전달 된 값 자체의 형태를 변경시키지 않으면서 배열의 뒤에 추가하는 메소드이고, extend 메소드는 인자로 전달 받은 iterable 데이터의 원소를 배열의 뒤에 추가하는 메소드이다. 

## 참조

* [append vs. extend](http://stackoverflow.com/questions/252703/append-vs-extend)
* [8.6. array — Efficient arrays of numeric values](https://docs.python.org/2/library/array.html?#array.array.extend)
