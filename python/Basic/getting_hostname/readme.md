# How to get hostname

Python 코드가 실행되고 있는 PC의 Host name을 얻어오는 방법에 대해서 알아아본다. 

## Using socket module

python의 socket 모듈은 BSD socket interface를 제공한다. 이를 통해 특정 PC의 hostname을 얻어 올 수 있다. 

다음은 docs.python.org에서 socket moudule에 대한 소개 내용을 발췌한 것이다. 

>This module provides access to the BSD socket interface. It is available on all modern Unix systems, Windows, Mac OS X, BeOS, OS/2, and probably additional platforms.

### socket.gethostname()

socket 모듈의 gethostname() 함수를 사용하면 목적을 달성할 수 있다. 

다음은 docs.python.org에서 socket.gethostname() 함수의 내용을 발췌한 것이다. 

>Return a string containing the hostname of the machine where the Python interpreter is currently executing.
>
>If you want to know the current machine’s IP address, you may want to use gethostbyname(gethostname()). This operation assumes that there is a valid address-to-host mapping for the host, and the assumption does not always hold.
>
>Note: gethostname() doesn’t always return the fully qualified domain name; use getfqdn() (see above).


```python
import socket

hostname = socket.gethostname()
print hostname
```

다음은 출력 결과이다. 

```bash
$ python example.py
greenfrogui-MacBook-Pro.local
```

## Reference

* [How can I use Python to get the system hostname?](https://stackoverflow.com/questions/4271740/how-can-i-use-python-to-get-the-system-hostname)
* [17.2. socket — Low-level networking interface](https://docs.python.org/2/library/socket.html)