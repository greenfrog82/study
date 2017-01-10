# Error: Python packaing tool 'pip' not found

## 개발 환경
Ubuntu 14.04
PyCharm 2016.3.2

## 문제

PyCharm을 통해서 Django 프로젝트를 생성할 때 다음과 같은 오류 메시지가 발생하였다.

> Error: Python packaing tool 'pip' not found

오류 메시지의 원인은 PyCharm에서 Django 프로젝트를 생성할 때 **Python Interpreter**를 설정하게 되어있는데 이를 Python 3.4로 설정해 놓았었다. 하지만 개발 PC의 전역 **'pip'**가 Python 2.7용으로 설치되어 있었기 때문에 발생한 문제였다.

## 해결

따라서, 다음 명령을 통해 Python 3.4로 pip를 설치했더니 문제가 해결되었다.

```
sudo apt-get install python3-pip
```


## 참고

>**개발 환경**



* [How to install pip with Python 3?](http://stackoverflow.com/questions/6587507/how-to-install-pip-with-python-3)
* [Creating Django Project](https://www.jetbrains.com/help/pycharm/2016.3/creating-django-project.html)
