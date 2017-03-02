# standard arguments, positional argument(*args)와 keyword argument(**kwargs)에 대해서

> Python version 3.6.0을 기준으로 작성된 글이다.

## 개요

Django 관련 영문서를 읽다보면 standard arugments, positional argument 그리고 keyword argument라는 단어들이 나온다. 
파이썬에서는 이렇게 함수 또는 메소드의 인자로 3가지 종류의 인자를 사용한다. 
이에 대해서 알아보도록 하자.

## standard arguments

C#, Java, JavaScript등과 같은 언어에서 지금까지 다룬 일반적인 인자와 동일한 타입의 인자이다. 

예를들면 다음과 같다. 

[only_standard.argument.py](./src/only_standard.argument.py)

```python
def func(name, age):
    print('My name is %s.', % name)
    print('I am %d years old.', % age)

func('greenfrog', 36)
```
출력 결과
```
My name is greenfrog.
I am 36 years old.
```

## positional arguments (*args)

파라메터의 개수가 정해져있지 않을 때 사용하며, 튜플형태로 파라메터가 전달된다.

[args_example.py](./src/args_example.py)

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

만약, 튜플이나 리스트를 positional arguments에 전달하면 어떻게 될까?

위 예제의 함수를 다음과 같이 호출해보자. 

```python
echo_parameters([1, 2, 3, 'test'])
echo_parameters((1, 2, 3, 'test'))
```

출력 결과
```
[1, 2, 3, 'test']
(1, 2, 3, 'test')
```

위 출력결과를 보면 튜플이나 리스트를 전달하더라도 튜플과 리스트 자체를 하나의 인자로 인식하고 있음을 알 수 있다. 

다음과 같이 인자를 다시 전달해보면 위 설명이 정확히 이해될 것이다. 

```python
echo_parameters([1, 2, 3, 'test'], 1, 2, 3)
echo_parameters((1, 2, 3, 'test'), 1, 2 ,3)
```
출력 결과
```
[1, 2, 3, 'test']
1
2
3
(1, 2, 3, 'test')
1
2
3
```

## keyword arguments (**kwargs)

파라메터의 개수가 정해져있지 않을 때 사용하며, 딕셔너리형태로 파라메터가 전달된다.

[kwargs_example.py](./src/kwargs_example.py)

```python
def echo_parameters(**kwargs):
    for key, value in kwargs.items():
        print("%s : %s" % (key, value))

echo_parameters(name='greenfrog', passion='development', language='python')
```

출력 결과
```
passion : development
name : greenfrog
language : python
```

그러면, 다음과 같이 dictionary를 인자로 전달하면 어떻게 될까?

```python
param = {
    'name': 'greenfrog,
    'passion': 'development',
    'language': 'python'
}
```
출력결과
```
  File "d:\develop\study\python\Basic\args_kwargs\src\kwargs_example.py", line 8
    'name': 'greenfrog,
                      ^
SyntaxError: EOL while scanning string literal
```

위와 같이 오류가 발생한다. 

앞서 설명했던 standard parameters 역시 keyword parameter와 같이 호출할 수 있다. 다시 앞서 standard parameters를 설명할 때 사용했던 func 함수를 keyword parameter를 호출하듯이 호출해보자. 

```python
func(name = 'greenfrog', age = 36)
func(age = 36, name = 'greenfrog')
```
출력결과
```
My name is greenfrog.
I am 36 years old.
My name is greenfrog.
I am 36 years old.
```
한가지 주의깊게 볼 내용은 위에서 함수를 호출 할 때, 인자의 순서를 바꿔서 호출해도 정상적으로 잘 호출 된다는 것이다. 

## 혼합 사용

이 세 가지 타입의 인자들은 서로 혼용해서 사용할 수 있다.

```python
def print_parameter(arg1, arg2, *args, **kwargs):
    print(arg1)
    print(arg2)
    print(args)
    print(kwargs)

print_parameter(1, 2)

print_parameter(1, 2, 3, 4)

print_parameter(1, 2, 3, 4, name='greenfrog', job='developer')

```

출력 결과
```
# 첫번째 호출
1
2
()
{}

# 두번째 호출
1
2
(3, 4)
{}

# 세번째 호출
1
2
(3, 4)
{'name': 'greenfrog', 'job': 'developer'}

```

만약, 위 예제를 다음과 같이 호출하게 되면 오류가 발생한다.

```python
print_parameter(arg1=1, arg2=2, 3, 4, name='greenfrog', job='developer')
print_parameter(1, 2, 3, name='greenfrog', job='developer', 4)
```

출력 결과

```
File "/media/greenfrog/develop/Github/study/python/Basic/args_kwargs/src/together_example.py", line 11
  print_parameter(1, name='greenfrog', job='developer', 2)
SyntaxError: non-keyword arg after keyword arg
```

위와 같이 standard, positional, keyword arguments를 혼합해서 사용할 때는 반드시 순서를 지켜야하며, standard arguments를 keyword arguments를 호출하는 방식으로 사용해서는 안된다.

## 참조

* [파이선에서 *args와 **kwargs](http://arsviator.blogspot.kr/2015/04/args-kwargs.html)
* [Python - 파라미터 앞에 *, ** 의 의미? (*args, **kwargs)](http://jhproject.tistory.com/109)
* [python positional arguments and keyword arguments](http://sys-exit.blogspot.kr/2013/07/python-positional-arguments-and-keyword.html)