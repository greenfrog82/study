# How to set file owner and permission and apply these setting to log file.

로깅을 할 때, 로그파일에는 서비스에 대한 중요한 정보들이 남을 수 있기 때문에 로그파일의 onwer와 권한을 신중히 주어야한다.
예를들어, 웹 서비스를 하고 있다고 하면 웹 서버에 대한 권한이 주어진 사용자와 그룹들만이 해당 로그파일에 접근할 수 있으면 보안상 좋을 것이다.  

하지만, Python에서 제공하는 Log Handler들의 경우는 로그파일에 대한 사용자와 그룹 설정과 권한 설정에 대한 Configuration을 제공하지 않는다.  
이러한 경우, 서비스 관리자가 로그파일을 미리 생성해둔 후 사용자와 그룹 설정을 그리고 권한 설정을 해주면 된다. 하지만, 파일을 Rotate시키는 파일 핸들러(RotatingFileHandler,TimedRotatingFileHandler)들의 경우 Rotate되는 파일에 대해서는 원본 로그 파일의 사용자와 그룹 그리고 권한을 유지하지 않기 때문에 문제가 있다.  

따라서, 이번에 RotatingFileHandle과 Multi-Process 환경에서 로깅을 하기 위해 선택한 써드파티 라이브러리인 ConcurrentRotatingFileHandler를 확자앟여 위 문제를 해결해보았다.  

관련 코드는 다음 링크를 참조하자. 

* [RotatingFileHandlerEx.py](./src/RotatingFileHandlerEx.py)
* [ConcurrentRotatingFileHandlerEx.py](./src/ConcurrentRotatingFileHandlerEx.py)

## Reference

* [Customizing handlers with dictConfig()
](https://docs.python.org/2/howto/logging-cookbook.html#customizing-handlers-with-dictconfig)
* [Does python logging.handlers.RotatingFileHandler allow creation of a group writable log file?](https://stackoverflow.com/questions/1407474/does-python-logging-handlers-rotatingfilehandler-allow-creation-of-a-group-writa)
* [stat — Interpreting stat() results](https://docs.python.org/2/library/stat.html#module-stat)
* [How to change the user and group permissions for a directory, by name?
](https://stackoverflow.com/questions/5994840/how-to-change-the-user-and-group-permissions-for-a-directory-by-namej)
* [How can I get a file's permission mask?
](https://stackoverflow.com/questions/5337070/how-can-i-get-a-files-permission-mask)
* [how to find the owner of a file or directory in python
](https://stackoverflow.com/questions/1830618/how-to-find-the-owner-of-a-file-or-directory-in-python)