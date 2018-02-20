# About getattr, setattr, hasattr

getattr, setattr, hasattr build-in function에 대해서 알아보자.

## getattr(object, name[, default])

>객체에서 attribute의 값을 반환하기 위한 함수 

* Parameters
    * object : name parameter로 전달받은 attribute를 반환하기 위한 객체
    * name : object parameter로부터 얻고자하는 attribute의 이름
    * default (optional) : name parameter를 통해 얻고자하는 attribute가 object에 존재하지 않는 경우 반환하고자하는 default 값
* Return   
    * name parameter를 통해 얻고자하는 attribute가 object에 존재하지 않는 경우 반환하고자하는 default 값. 만약 default parameter를 전달하지 않고 얻고자하는 attribute가 존재하지 않는 경우는 AttributeError가 발생한다. 

파이썬의 경우 object에 동적으로 attribute를 얼마든지 할당할 수 있다.  
따라서, 해당함수는 기본적으로 클래스에 정의되지 않고 동적으로 할당 된 attribute의 존재여부에 따른 처리를 하기 위해 활용할 수 있다. 

다음 예제를 보면 특정 사람의 age attribute가 없는 경우 기본값으로 0을 반환하도록 하였다. 만약 기본을 주지 않으면 예외 처리를 해주어야하는데, 기본값을 통해 좀 더 간결하게 처리가 가능한 것을 알 수 있다. 

```python
class Person:
    name = 'dummy'

person = Person()

print 'Age of this person is %d' % getattr(person, 'age', 0)

try:
    age = getattr(person, 'age')
except AttributeError as ex:
    print 'Age of this person is 0'
```

## hasattr(object, name)

>객체에 특정 attribute가 존재하는지 확인하기 위한 함수 

* Parameters
    * object : name parameter로 전달받은 attribute가 존재하는지 확인하기 위한 객체
    * name : object parameter가 특정 attribute를 갖고있는지 조사하기 위한 attribute의 이름
* Return  
    * True : 특정 attribute가 존재하는 경우
    * False : 특정 attribute가 존재하지 않는 경우 

해당 함수는 내부적으로 getattr(object, name) function을 통해서 object에 attribute가 존재하는지 확인한다. AttributeError가 발생하지 않으면 True를 반환하고 그렇지 않으면 False를 반환한다. 

```python
class Person:
    name = 'dummy'

person = Person()

if hasattr(person, 'name'):
    print 'Person has a name attribtue.'

if not hasattr(person, 'age'):
    print 'Person has not a age attribute.'
```

## setattr(object, name, value)
    
>객체에 특정 attribute를 create하거나 overwrite한다. 

* Parameters
    * object : name parameter로 전달받은 attribute를 create하거나 overwrite 하기위한 객체
    * name : object parameter에 create 또는 overwrite하고자 하는 attribute 이름
    * value : create 또는 overwrite된 attribute의 값

```python
class Person:
    name = 'dummy'

person = Person()

setattr(person, 'age', 37)
print person.age
```
    

## Reference

* [Fluent Python](http://shop.oreilly.com/product/0636920032519.do)