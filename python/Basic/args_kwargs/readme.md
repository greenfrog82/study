# *args와 **kwargs에 대해서

## *args

파라메터의 개수가 정해져있지 않을 때 사용하며, 튜플형태로 파라메터가 전달된다.

```python
def echo_parameters(*args):
  for(item in args):
    print(item)

echo_parameters(1, 2, 3, 'test')
```
출력 결과
```
1   
2
3
test
```

## **kwargs

파라메터의 개수가 정해져있지 않을 때 사용하며, 딕셔너리형태로 파라메터가 전달된다.

```python
def echo_parameters(**kwargs):
    for key, value in kwargs.items():
        print "%s : %s" % (key, value)

echo_parameters(name='greenfrog', passion='development', language='python')
```

출력 결과
```
passion : development
name : greenfrog
language : python
```

## 혼합 사용

이 둘을 혼합해서 사용 할 수 있다.

```python
def print_parameter(*args, **kwargs):
    print args
    print kwargs

print_parameter(1, 2)

print_parameter(name='greenfrog', job='developer')

print_parameter(1, 2, name='greenfrog', job='developer')
```

출력 결과
```
# 첫번째 호출
(1, 2)
{}

# 두번째 호출
()
{'job': 'developer', 'name': 'greenfrog'}

# 세번째 호출
(1, 2)
{'job': 'developer', 'name': 'greenfrog'}
```

만약, 위 예제를 다음과 같이 호출하게 되면 오류가 발생한다.

```python
print_parameter(1, name='greenfrog', job='developer', 2)
```

출력 결과

```
File "/media/greenfrog/develop/Github/study/python/Basic/args_kwargs/src/together_example.py", line 11
  print_parameter(1, name='greenfrog', job='developer', 2)
SyntaxError: non-keyword arg after keyword arg
```
## 참조

* [파이선에서 *args와 **kwargs](http://arsviator.blogspot.kr/2015/04/args-kwargs.html)
* [Python - 파라미터 앞에 *, ** 의 의미? (*args, **kwargs)](http://jhproject.tistory.com/109)
