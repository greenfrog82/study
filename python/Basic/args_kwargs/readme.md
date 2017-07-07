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
echo_parameters({
    'name': 'greenfrog',
    'passion': 'development',
    'language': 'python'
}

```
출력결과
```
Traceback (most recent call last):
  File "/Users/greenfrog/develop/study/python/Basic/args_kwargs/src/kwargs_example.py", line 10, in <module>
    'language': 'python'
TypeError: echo_parameters() takes exactly 0 arguments (1 given)
```
앞선 결과와 동일한 결과가 나올것으로 예상했지만, 위와 같이 에러가 발생한다. 위와 같이 keyward parameter를 사용할 때는 반드시 keyward와 함께 파라메터르 전달해야한다.

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

#### Keyword argument 받는 함수에서 다른 함수로 Keyword argument전달하기

다음과 같이 Keyword argument를 받아 앞서 소개했던 echo_parameters 함수에 전달하는 함수 pass_kwargs 함수가 있다고 하자.
pass_kwargs를 echo_parameters로 전달하려면 어떻게 해야할까?

```python
def pass_kwargs(**kwargs):
    echo_parameters(??)
```

위 문제를 해결하는 방법은 아주 간단한데 pass_kwargs로 전달받은 **kwargs를 그대로 echo_prameters에 전달해주면된다.
다음 코드를 실행해보자.

```python
def pass_kwargs(**kwargs):
    echo_parameters(**kwargs)

pass_kwargs(language='Python', framework='Django')
```

실행 결과

```
framework : Django
language : Python
```

재미있는것은 dictionary에 ** keyward를 붙여주면 keyward argument로 인자를 전달할 수 있다.
다음 코드를 실행하면 앞선 결과와 동일한 결과를 볼 수 있다.

```python
pass_kwargs(**{
    'language': 'Python',
    'framework': 'Django'
}
```

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

만약, print_parameter 함수에서 positional arguments를 skip하고 keyword arguments를 전달하려면 어떻게 해야할까? 일반적으로 생각하면 arguments는 앞에서부터 순서대로 받아들이기 때문에 중간에 있는 positional arguments를 skip할 수 있는 방법이 떠오르지 않는다.

하지만 의외로 간단히 해결되는데 positional arguments를 입력해야하는 위치에 keyword arguments를 입력해주면 된다.

```python
print_parameter(1, 2, name='greenfrog', job='developer')
```
출력 결과

```
1
2
()
{'name': 'greenforg', 'job':'developer'}}
```

## 참조

* [파이썬에서 *args와 **kwargs](http://arsviator.blogspot.kr/2015/04/args-kwargs.html)
* [Python - 파라미터 앞에 *, ** 의 의미? (*args, **kwargs)](http://jhproject.tistory.com/109)
* [python positional arguments and keyword arguments](http://sys-exit.blogspot.kr/2013/07/python-positional-arguments-and-keyword.html)
* [pass **kwargs argument to another function with **kwargs](https://stackoverflow.com/questions/9867562/pass-kwargs-argument-to-another-function-with-kwargs)
