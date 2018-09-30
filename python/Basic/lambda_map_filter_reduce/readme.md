# lambda, map, reduce and filter

## lambda

`lambda`는 Functional Programming에 익숙한 개발자라면 누구나 알고있는 표현식이다.  
이를 간단히 설명하면, 전달받은 함수에 따라 동작을 달리하는 코드 템플릿이 있다고 할 때 재활용 할 필요가 없는 함수가 있다고 하 때 이러한 표현식을 이용하면 코드를 좀 더 간단히 표현할 수 있다.   

lambda 표현식은 다음과 같다.

>lambda argument_list: expression

앞서 `lambda` 표현식의 정의를 보면 `argument_list`로 전달 된 인자들이 `expression`으로 전달되는 구조이다.

### Example

다음 에제는 `lambda`를 통해 덧셈을 하는 함수를 만든다. 

[ex_lambda.py](./ex_lambda.py)
```python
>>> sum = lambda x, y: x + y
>>> sum(3, 4)
7
```

다음과 같이 `lambda`를 정의할 때 `argument_list`를 정의하지 않으면 인자를 전달받지 않는 `lambda`가 정의된다. 

[ex_lambda.py](./ex_lambda.py)
```python
>>> one = lambda: 1
>>> one()
1
```








## Reference

* [Lambda, filter, reduce and map]