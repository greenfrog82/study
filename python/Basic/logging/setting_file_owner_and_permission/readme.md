# How to set file owner and permission and apply these setting to created file.

로깅을 할 때, 로그파일에는 서비스의 중요한 정보들이 남을 수 있기 때문에 로그파일의 사용자와   그룹 그리고 권한등을 신중히 주어야한다. 

예를들어, 로그파일의 사용자와 그룹은 해당 서비스를 쓰고 읽은 수 있는 사용자만 
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