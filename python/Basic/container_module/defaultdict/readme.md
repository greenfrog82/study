# defaultdict

`Python 2.7.14`

defaultdict는 [dict](https://docs.python.org/2.7/library/stdtypes.html#dict)의 서브클래스로 하나의 메소드가 override가 되었고, 하나의 writable instance 변수가 추가되었다. 나머지 기능들은 [dict](https://docs.python.org/2.7/library/stdtypes.html#dict)와 동일하다.  


New in version 2.5.

defaultdict objects support the following method in addition to the standard dict operations:

__missing__(key)
If the default_factory attribute is None, this raises a KeyError exception with the key as argument.

If default_factory is not None, it is called without arguments to provide a default value for the given key, this value is inserted in the dictionary for the key, and returned.

If calling default_factory raises an exception this exception is propagated unchanged.

This method is called by the __getitem__() method of the dict class when the requested key is not found; whatever it returns or raises is then returned or raised by __getitem__().

Note that __missing__() is not called for any operations besides __getitem__(). This means that get() will, like normal dictionaries, return None as a default rather than using default_factory.

defaultdict objects support the following instance variable:

default_factory
This attribute is used by the __missing__() method; it is initialized from the first argument to the constructor, if present, or to None, if absent.



# Reference

* [Python defaultdict() 사용하기](https://dongyeopblog.wordpress.com/2016/04/08/python-defaultdict-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)
* [8.3.3. defaultdict objects](https://docs.python.org/2.7/library/collections.html#defaultdict-objects)