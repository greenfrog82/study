# object serialize, deserialize

## 개요

파이썬에서 객체를 serialize하고 deserialize 하는 방법에 대해서 알아보던 중 [pickle](https://docs.python.org/2/library/pickle.html)이라는 내장 라이브러리가 있다는 것을 알게되었다. 

[pickle](https://docs.python.org/2/library/pickle.html)을 통한 객체 serialize/deserialize에 대해서 알아보자.

## [pickle](https://docs.python.org/2/library/pickle.html)이란?

Python 2.x 버전의 공식 사이트에 가면 [pickle](https://docs.python.org/2/library/pickle.html)에 대해서 다음과 같이 기술하고 있다. 

```
The pickle module implements a fundamental, but powerful algorithm for serializing and de-serializing a Python object structure. “Pickling” is the process whereby a Python object hierarchy is converted into a byte stream, and “unpickling” is the inverse operation, whereby a byte stream is converted back into an object hierarchy. Pickling (and unpickling) is alternatively known as “serialization”, “marshalling,” [1] or “flattening”, however, to avoid confusion, the terms used here are “pickling” and “unpickling”.

This documentation describes both the pickle module and the cPickle module.

Warning The pickle module is not secure against erroneous or maliciously constructed data. Never unpickle data received from an untrusted or unauthenticated source.
```
간단히 이야기하면 python에서 제공하는 serializing, de-serializing 모듈이고 여기서는 serializing을 pickling이라고 하고 de-serializing을 unpickling이라고 부른다고 한다. 

주의사항으로는 해당 모듈이 잘못되었거나, 의심스러운 데이터에 대해서 안전하지 않으므로 출처가 불분명한 곳에서 받은 데이터에 대한 unpickling은 절대 하지 말아야한다. 

앞서 python 공식 사이트에서 pickle을 사용할 때 serializing과 de-serializing을 각각 pickling, unpicking이라고 부른다고 했으니 본 문서에서는 이 용어를 사용하도록 하겠다. 

## pickling

1부터 5까지의 숫자를 가지고 있는 배열을 pickling 해보자.  

[pickling.py](./src/pickling.py)

```python
import pickle

numbers = [1, 2, 3, 4, 5]

afile = open('sample.pkl', 'wb')
pickle.dump(numbers, afile)
afile.close()
```

## unpickling

앞서 pickling했던 배열을 unpicking 해보자. 

[unpickling.py](./src/unpickling.py)
```python
import pickle

afile = open('sample.pkl', 'rb')
numbers = pickle.load(afile)
afile.close()
```

## 참조

* [pickle](https://docs.python.org/2/library/pickle.html)