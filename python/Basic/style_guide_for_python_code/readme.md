# [PEP 8 -- Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/#function-and-method-arguments)

## [Function and Method Arguments](https://www.python.org/dev/peps/pep-0008/#function-and-method-arguments)

인스턴스 메소드의 첫번째 인자는 언제나 `self`를 사용해라.  
클래스 메소드의 첫번째 인자느냐 `cls`를 사용해라.

만약 함수의 인자가 파이썬의 예약어와 같은 것을 써야한다면, 인자에 single trailing underscore를 사용하는것이 인자를 축약하거나 스펠링을 혼란스럽게 하는것보다 낫다. 결국 class_가 clss보다 낫다. (아마도 동의어를 통해서 예약어의 사용을 피하는것이 더 나을것이다.)
