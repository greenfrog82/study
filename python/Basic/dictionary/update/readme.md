# About update method of dictionary

#### Requirement

* Python 2.7.14

## Description

**update** 메소드는 keyword argument 또는 dictionary를 인자로 받아 dictionary 객체를 갱신한다.  
이때, 인자로 전달 된 key가 dictionary 객체의 key에 존재한다면 인자로 전달 된 key의 value로 갱신된다. 

## Syntax

> dict.udpate(dict2) 
> dict.update(**kwargs)

## Parameters

    * dict2 - 현재 객체를 갱신하고자 하는 dictionary
    * iterable of key/value pairs - 반복가능한 key/value pair 
    * **kwargs - 현재 객체를 갱신하고자 하는 keyword argument
    

## Return

반환값은 None이다. 


## Example

### Using dict2 param

```python
dic_origin = { 
    'name': 'greenforg',
    'age' : 27,
}

dic_origin.update({
    'age': 37,
    'sex': 'male'
});

print dic_origin
```

### Using iterable of key/value pairs param

```python
dic_origin = { 
    'name': 'greenforg',
    'age' : 27,
}

# dic_origin.update((('age', 37), ('sex', 'male')));
#dic_origin.update([('age', 37), ('sex', 'male')]);
dic_origin.update([['age', 37], ['sex', 'male']]);

print dic_origin
```

### Using **kwargs

```python
dic_origin = { 
    'name': 'greenforg',
    'age' : 27,
}

dic_origin.update(age=37, sex='male')

print dic_origin
```

## Reference

* [Python dictionary update() Method](https://www.tutorialspoint.com/python/dictionary_update.htm)
* [update([other])](https://docs.python.org/2/library/stdtypes.html#dict.update)