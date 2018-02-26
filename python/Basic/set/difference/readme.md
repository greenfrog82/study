# About difference method

**Set** 클래스의 **difference** 메소드는 쉡게 이야기해서 두 집합의 **차집합**을 구하는 메소드이다.   

## Let's show the basic example

다음 예제코드를 보자.
먼저 A의 차집합을 구하고, 다음으로 B의 차집합을 구하는 코드이다. 

```python
A = {'a', 'b', 'c', 'd'}
B = {'c', 'f', 'g'}

# Equivalent to A-B
print 'A.difference(B) : ', A.difference(B)

# Equivalent to B-A
print 'B.difference(A) : ', B.difference(A)
```

위 코드를 실행한 결과는 다음과 같다. 

```sh
A.difference(B) :  set(['a', 'b', 'd'])
B.difference(A) :  set(['g', 'f'])
```

## In case there is no intersection

앞선 예제에서는 두 집합에 대하여 교집합이 존재하였다. 
그렇다면 교집합이 존재하지 않는 경우의 반환값은 무엇일까?

```python
A = {'a', 'b', 'c'}
B = {'d', 'e', 'f'}

print 'A.difference(B) : ', A.difference(B)
print 'B.difference(A) : ', B.difference(A)
```

교집합이 존재하지 않으므로 각각 집합의 원소를 출력한다. 

```sh
A.difference(B) :  set(['a', 'c', 'b'])
B.difference(A) :  set(['e', 'd', 'f'])
``` 

## Remarks

해당 함수는 자기자신의 값을 변경하지 않고 새로운 집합을 반환한다. 

다음 예제를 보자.  
각각 집합의 차집합을 구한 후 원본집합의 값을 출력하는 예제이다. 

```python
A = {'a', 'b', 'c', 'd'}
B = {'c', 'f', 'g'}

print 'A.difference(B) : ', A.difference(B)
print 'B.difference(A) : ', B.difference(A)

print 'A : ', A
print 'B : ', B
```

다음 결과를 보면, 원본집합의 값은 변화가 없음을 알 수 있다. 

```sh
A.difference(B) :  set(['a', 'b', 'd'])
B.difference(A) :  set(['g', 'f'])
A :  set(['a', 'c', 'b', 'd'])
B :  set(['c', 'g', 'f'])
```



## Reference

* [Python Set difference()](https://www.programiz.com/python-programming/methods/set/difference)