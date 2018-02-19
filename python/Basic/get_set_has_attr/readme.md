# About getattr, setattr, hasattr

getattr, setattr, hasattr build-in function에 대해서 알아보자.

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

## Reference

* [Fluent Python](http://shop.oreilly.com/product/0636920032519.do)