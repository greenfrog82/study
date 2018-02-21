# Adding contextual information to your logging output

로깅을 하다보면 LogRecord 인스턴스가 제공하지 않는 데이터를 로그로 남겨야하는 경우가 있다. 예를들어, Web Application을 개발하고 있다면 사용자 Request에 대한 정보를 로깅해야하는 경우이다.  

파이썬의 logging 모듈에서 이러한 기능을 구현하기 위해서는 다음 세가지 방법이 있다. 

1. Using extra parameter 
2. Using LoggerAdapter class
3. Using Filter

## Using extra parameter
 
logging.Logger 클래스의 다음 메소드들에는 **msg** 파라메터 다음으로 **extra** 파라메터를 전달 할 수 있다.  

* debug
* info
* warning
* error
* ciritical

**extra** 파라메터는 dictionary 타입으로, logging.Logger 클래스의 makeRecord method에서 이 파라메터로 전달 된 dictionary의 key와 value를 각각 LogRecord 인스턴스의 attribute와 value로 설정한다.  
다음 코드를 참조하자. 

```python
def makeRecord(self, name, level, fn, lno, msg, args, exc_info, func=None, extra=None):
    """
    A factory method which can be overridden in subclasses to create
    specialized LogRecords.
    """
    rv = LogRecord(name, level, fn, lno, msg, args, exc_info, func)
    if extra is not None:
        for key in extra:
            if (key in ["message", "asctime"]) or (key in rv.__dict__):
                raise KeyError("Attempt to overwrite %r in LogRecord" % key)
            rv.__dict__[key] = extra[key]

    return rv
```

### Example

다음과 같이 idx 정보를 로깅한다고 하자.  
이러한 경우 format 설정에 %(idx)d를 추가하고 **extra** 파라메터를 통해 해당 포맷에 전달하기 위한 dictionary를 전달하면 된다.  
다음 코드를 참조하자.

[ex_using_extra_parameter.py](./ex_using_extra_parameter.py)

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '%(asctime)s %(levelname)s %(name)s %(idx)d %(message)s' # %(idx)d 포맷 추가
        },
    },
    ...
}

logging.config.dictConfig(LOGGING)
logger = logging.getLogger(__name__)

for idx in range(10):
    logger.debug('message', extra={'idx': idx}) # extra={'idx': idx}를 통해 %(idx)d 포맷에 값 전달
```

## Reference

* [Adding contextual information to your logging output](https://docs.python.org/2/howto/logging-cookbook.html#adding-contextual-information-to-your-logging-output)