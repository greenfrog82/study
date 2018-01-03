# About Generator and yield

실행 코드를 lazy하게 동작시키는 기법은 프로그래밍에서 흔히 사용되는 기법이다. 이러한 lazy 기법들은 프로그램의 공간적 성능을 향상시키기 위해서 사용된다. 

Generator는 데이터를 메모리에 저장하지 않는 형태의 iterator이다. 다시 말해서 일반적으로 데이터를 메모리에 저장하는 배열, 리스트, 맵 등과 같은 자료구조와 달리 iterate 되는 시점에 코드를 동작시켜 데이터를 만들어내어 반환하는 형태의 iterator이다. 

Generator는 'generator expression' 또는 'yield' 키워드를 통해 생성할 수 있다. 

Generator를 생성하는 각각의 방법과 동작 방식 그리고 이를 활용하는 방법에 대해서 알아보자.

#### Requirement

* Python 2.7

## Using Generator Expression

**Generator Expression**은 Generator를 만들어내는 방법 중 하나이다. **List Comprehension**과 동일한 문법을 사용하지만 []를 사용하지 않고 ()를 사용한다. 

다음은 0부터 4까지의 값을 반환하는 Generator를 **Generator Expression**을 통해 생성한 것이다. 

다음 예제 코드를 보면 **Generator Expression**을 통해 Generator를 생성한 후 한번 iteration을 시킨 후 다시 한번 iteration을 시키고 있다. 이와 같이 iteration을 두번 시킨 이유는 Generator의 한가지 특징을 소개하기 위해서이다. 

[ex_generator_expression.py](./ex_generator_expression.py)

```python
gen_num = (num for num in range(5))

print type(gen_num)

print 'First iterating gen_num'

for num in gen_num:
    print num 

print 'Second iterating gen_num'

for num in gen_num:
    print num 
```

다음은 위 코드를 실행한 결과이다. 
먼저, **Generator Expression**을 통해 반환 된 gen_num의 타입을 출력해보았는데 <type 'generator'>라고 출력된 것을 확인 할 수 있다. 

다음 출력 결과를 보면 첫번째 iteration의 결과만이 출력 될 뿐 두번쨰 iteration의 결과는 출력되지 않는다.

```sh
$ python ex_generator_expression.py
<type 'generator'>
First iterating gen_num
0
1
2
3
4
Second iterating gen_num
```

이것은 Generator의 아주 중요한 특징을 보여준다.
**Generator는 특정 데이터를 메모리에 저장하지 않고 iterate 될 때(for num in gen_num:) Generator Expression의 코드의 for loop를 한번씩 실행시키고 실행 된 구간을 기억한다. 따라서 첫번째 for loop에서는 결과를 출력하지만, 두번째 for loop에서는 iterate를 하지 않기 때문에 결과를 출력하지 못하는 것이다.**

## Using yield keyword

**yeild** keyword를 통해서도 Generator를 생성할 수 있다. **yeild** keyword를 사용하는 경우는 **Generator Expression**으로는 Generator를 생성하기 어려운 경우가 되겠다. 

다음은 앞선 예제를 **yeild** 키워드를 통해 Generator를 생성하도록 수정한 예제이다. 

예제를 보면 number_generator라는 함수를 정의한 후 내부에서 for loop을 돌면서 생성 된 num변수 앞에 **yield** 키워드를 사용하였다. 
이와 같이 함수에 yield 키워드를 사용하면 파이썬은 해당 함수를 Generator를 생성하는 함수를 해석한다.

따라서, 해당 함수를 호출하는 시점에는 함수 내부이 코드가 동작하지 않는다. 함수 내부의 코드가 동작하는 시점은 반환 된 Generator가 iterate되는 시점이다. 

Generator가 최초 iterate가 되면 함수의 내부코드가 동작되고 yield 키워드를 만나면 데이터를 반환한다. 결국 매 iterate때마다 함수 내부의 yield 키워드가 호출되고 더 이상 호출되지 않을때 까지 iterate는 반복된다.

[ex_generator_by_yield.py](./ex_generator_by_yield.py)

```python 
def number_generator():
    for num in range(5):
        yield num

gen_num = number_generator()

print type(gen_num)

print 'First iterating gen_num'

for num in gen_num:
    print num

print 'Second iterating gen_num'

for num in gen_num:
    print num
```

다음은 출력 결과이다. 앞서 **Generator Expression**의 예제와 결과는 동일하다. 

```sh
<type 'generator'>
First iterating gen_num
0
1
2
3
4
Second iterating gen_num
```

## Conclusion

결국, Generator가 프로그램의 공간적 성능을 향상시키는 아이디어는 다음과 같다. 

예를들어, DB에서 100만건의 데이터를 읽어들인 후 이를 JSON형태로 가공하여 Front-End로 전달한다고 가정하자. 이때, DB에서 데이터를 가져오는 일반화된 함수가 하나 존재한다. 

Generator를 사용하지 사용하지 않는 경우 일반화된 함수에서는 특정 자료구조에 100만건의 데이터를 담아서 전달할 것이다. 그리고 이 자료구조를 iterate 돌면서 다시 JSON 형태로 데이터를 가공하여 또 다른 자료구조에 데이터를 다시 저장해야할 것이다. 따라서 100만건에 대한 데이터를 두개의 자료구조에 저장해야하는 것이다. 

하지만 DB에서 데이터를 가져오는 일반화된 함수가 Generator를 반환한다면, JSON 형태로 데이터를 저장하는 자료구조의 데이터 공간만이 사용될 것이다. 

따라서, Generator를 잘 활용하면 프로그램의 공간적 성능을 향상시키는데 도움이 많이 될 것이다. 


## Reference

* [Generators](https://www.learnpython.org/en/Generators)
* [The Python yield keyword explained](https://pythontips.com/2013/09/29/the-python-yield-keyword-explained/)
* [Improve Your Python: 'yield' and Generators Explained](https://jeffknupp.com/blog/2013/04/07/improve-your-python-yield-and-generators-explained/)