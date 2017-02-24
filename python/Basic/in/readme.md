# 특정 데이터가 리스트에 존재하는지 확인하기

다음과 같이 리스트가 있다고 하자. 

```python
values = [1, 2, 3]
```

위 리스트에서 특정 값의 존재를 loop를 돌리지 않고 확인하는 방법을 찾아보았다. 

* <value> in <list> 특정 값이 리스트에 존재하는지 확인하여 Boolean값 반환
* <value> not in <list> 특정 값이 리스트에 존재하지 않는지 확인하여 Boolean값 반환

## 예제 in

```python
3 in values
```

**결과**

```
True
```

```python 
4 in values
```

**결과**

```
False
```

## 예제 not in

```python
3 not in values
```

**결과**

```
False
```

```python 
4 not in values
```

**결과**

```
True
```

## 참조

* [Fastest way to check if a value exist in a list Ask Question](http://stackoverflow.com/questions/7571635/fastest-way-to-check-if-a-value-exist-in-a-list)
