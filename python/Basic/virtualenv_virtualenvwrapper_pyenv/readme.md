# virtualenv, virtualenvwrapper and pyenv

Python은 라이브러리 의존관계를 격리하기 위해서 가상환경을 사용한다. 이때 사용하는것이 `virtualenv`라는 라이브러리이고 이를 사용하기 편하게 하고 확장한 라이브러리가 `virtualwrapper`이다.  
`pyenv`는 하나의 머신에서 여러개의 파이썬 버전을 충돌없이 사용할 수 있도록 해준다.  

## virtualenv

기본적인 가상환경을 제공하는 라이브러리이다. 

### Installing virtualenv

다음 명령을 통해 virtualenv를 설치하자. 

```bash
$ pip install virtualenv
```

### Making virtual environment

다음 명령을 통해 virtual environment를 만들 수 있다. 

> $ virtualenv [virtual environment path]

예를들어, 다음과 같이 django_ex라는 경로에 virtual environment를 만들어보자. 

```bash
$ virtualenv django_ex
Using base prefix '/usr'
New python executable in /develop/python/Basic/virtualenv_virtualenvwrapper_pyenv/django_ex/bin/python3
Also creating executable in /develop/python/Basic/virtualenv_virtualenvwrapper_pyenv/django_ex/bin/python
Installing setuptools, pip, wheel...

$ ll
drwxr-xr-x  4 root root  128 Oct 11 23:10 ./
drwxr-xr-x 55 root root 1760 Oct 11 22:47 ../
drwxr-xr-x  6 root root  192 Oct 11 23:10 django_ex/
-rw-r--r--  1 root root 1149 Oct 11 23:09 readme.md

$ cd django_ex
$ ll
drwxr-xr-x  6 root root 192 Oct 11 23:10 ./
drwxr-xr-x  4 root root 128 Oct 11 23:10 ../
drwxr-xr-x 16 root root 512 Oct 11 23:10 bin/
drwxr-xr-x  3 root root  96 Oct 11 23:10 include/
drwxr-xr-x  3 root root  96 Oct 11 23:10 lib/
-rw-r--r--  1 root root  59 Oct 11 23:10 pip-selfcheck.json
```

만약 파이썬 버전을 명시해주고 싶으면 다음과 같은 명령을 사용하자. 

> $ virtualenv --python=[python path] ENV

예를들어, Python2.7을 사용하는 가상환경을 만들면 다음과 같다. 

```bash
$ virtualenv --python=/usr/bin/python2.7 py2
Running virtualenv with interpreter /usr/bin/python2.7
New python executable in /develop/python/Basic/virtualenv_virtualenvwrapper_pyenv/py2/bin/python2.7
Also creating executable in /develop/python/Basic/virtualenv_virtualenvwrapper_pyenv/py2/bin/python
Installing setuptools, pip, wheel...done.
$ source py2/bin/activate 
(py2) $ python
Python 2.7.12 (default, Dec  4 2017, 14:50:18)
[GCC 5.4.0 20160609] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

### Activation Virtual Environment

다음 명령을 통해 virtual environment를 실행할 수 있다. (이하 ENV는 virtual environment path를 가리킨다.)

> $ source ENV/bin/activate

그럼 앞서 만든 django_ex 가상환경을 활성화해보자.   

```bash
$ source django_ex/bin/activate
(django_ex) $
```

### Deactivation Virtual Environment

이번에는 활성화된 가상환경을 비활성화 하는 방벙에 대해서 알아보자.  
다음 명령을 사용하면 활성화된 가상환경에서 빠져나올 수 있다.   

> (ENV) $ deactivate

활성화 된 django_ex 가상환경을 비활성화해보자. 

```bash
# source django_ex/bin/activate
(django_ex) # deactivate
#
```

### Removing Virtual Environment

가상환경을 제거하는 방법은 아주 간단한데, 가상환경을 비활성화 시킨 상태에서 경로를 삭제해주기만 하면 된다.   

> (ENV) deactivate
> # rm -rf ENV

### Example

위 명령을 실행시키면 프롬프트 앞에 가상환경의 이름이 표시되는 것을 확인할 수 있다.  
앞서 가상환경은 라이브러리 의존관계를 격리하기 위한것이라고 했다. 그러면 pip을 통해 django 최신버전을 설치해보자. 

```bash
(django_ex) $ pip install django
Collecting django
  Downloading https://files.pythonhosted.org/packages/32/ab/22530cc1b2114e6067eece94a333d6c749fa1c56a009f0721e51c181ea53/Django-2.1.2-py3-none-any.whl (7.3MB)
    100% |################################| 7.3MB 4.7MB/s
Collecting pytz (from django)
  Using cached https://files.pythonhosted.org/packages/30/4e/27c34b62430286c6d59177a0842ed90dc789ce5d1ed740887653b898779a/pytz-2018.5-py2.py3-none-any.whl
Installing collected packages: pytz, django
Successfully installed django-2.1.2 pytz-2018.5
(django_ex) $ pip list
Package    Version
---------- -------
Django     2.1.2
pip        18.1
pytz       2018.5
setuptools 40.4.3
wheel      0.32.1
```

이번에는 django_legacy라는 이름을 가상환경을 하나 더 만들어서 django 1.4.22를 설치해보자.  

```
pip install django==1.4.22
Collecting django==1.4.22
  Downloading https://files.pythonhosted.org/packages/46/7f/cead60a10b0208451c42e80db2cc90564cf810148ee46631699ec691cbea/Django-1.4.22.tar.gz (7.8MB)
    100% |################################| 7.8MB 4.5MB/s
Building wheels for collected packages: django
  Running setup.py bdist_wheel for django ... error
  Complete output from command /develop/python/Basic/virtualenv_virtualenvwrapper_pyenv/django_lagacy/bin/python3 -u -c "import setuptools, tokenize;__file__='/tmp/pip-install-wnq40vu6/django/setup.py';f=getattr(tokenize, 'open', open)(__file__);code=f.read().replace('\r\n', '\n');f.close();exec(compile(code, __file__, 'exec'))" bdist_wheel -d /tmp/pip-wheel-q1zm7ve9 --python-tag cp35:
  Traceback (most recent call last):
    File "<string>", line 1, in <module>
    File "/tmp/pip-install-wnq40vu6/django/setup.py", line 69, in <module>
      raise RuntimeError('Django 1.4 does not support wheel. This error is safe to ignore.')
  RuntimeError: Django 1.4 does not support wheel. This error is safe to ignore.

  ----------------------------------------
  Failed building wheel for django
  Running setup.py clean for django
Failed to build django
Installing collected packages: django
  Running setup.py install for django ... done
Successfully installed django-1.4.22
(django_lagacy) root@328f27a98cb1:/develop/python/Basic/virtualenv_virtualenvwrapper_pyenv# pip list
Package    Version
---------- -------
Django     1.4.22
pip        18.1
setuptools 40.4.3
wheel      0.32.1
```

각각 가상환경에 라이브러리들이 격리되는 것을 확인할 수 있다. **이 부분이 가상환경을 사용하는 핵심 이유인데 하나의 머신에서 분리된 가상환경을 제공하므로서 라이브러리의 충돌없이 소프트웨어를 개발할 수 있도록 해준다.**

## virtualenvwrapper

앞서 virtualenv는 가상환경의 경로를 개발자가 세세히 관리하지 않으면 여기저기 흩어져 관리하기 어렵게 되고, 가상환경을 활성화 시키기 위해서는 가상환경의 경로를 찾아야하는등 불편한 점이 여러가지 있다.   
이를 개선한 것이 virtualenvwrapper로 다음과 같은 특징을 갖는다.   

* Organizes all of your virtual environments in one place.
* Wrappers for managing your virtual environments (create, delete, copy).
* Use a single command to switch between environments.
* Tab completion for commands that take a virtual environment as argument.
* User-configurable hooks for all operations (see Per-User Customization).
* Plugin system for more creating sharable extensions (see Extending Virtualenvwrapper). 

### Install

virtualenvwrapper를 다음 명령을 통해 설치한다.  

> $ pip install virtualenvwrapper

### Initialize

virtualenvwrapper를 사용하기 위해서는 초기화가 필요하다. 
초기화 단계에서는 가상환경 디렉토리들을 관리하기 위한 경로를 설정하고 virtualenvwrapper.sh을 실행시켜 virtualenvwrapper를 기동하는 것이다.  
이를 .bashrc(Unix/Linux) 또느 .bash_profile(OS X)에 저장해서 사용한다. 

```bash
$ echo 'export WORKON_HOME=~/.virtualenv' >> ~/.bashrc
$ echo 'source /usr/local/bin/virtualenvwrapper.sh' >> ~/.bashrc
$ source ~/.bashrc
```

### Making Virtual Environment

가상환경을 만들때는 다음 명령을 사용한다.

> $ mkvirtualenv ENV

django_ex라는 가상환경을 만들어보자. 

```bash
$ mkvirtualenv django_ex
```

방금 생선한 django_ex 가상환경을 WORKON_HOME에서 찾아보자. 
`virtualenv`와 달리 다른 가상환경을과 함께 일관된 경로에서 가상환경들이 관리되고 있는 것을 알 수 있다. 

```bash
$ ll ~/.virtualenv
total 24
drwxr-xr-x 6 root root 4096 Oct 12 00:21 ./
drwx------ 1 root root 4096 Oct 12 00:09 ../
drwxr-xr-x 5 root root 4096 Oct 12 00:14 django_2/
drwxr-xr-x 5 root root 4096 Oct 12 00:12 django_ex/
drwxr-xr-x 5 root root 4096 Oct 12 00:21 test/
drwxr-xr-x 5 root root 4096 Oct 12 00:21 test2/
```

### Activation Virtual Environment

가상환경의 활성화는 다음 명령을 사용한다. `virtualenv`와 비교해서 편리한 점은 사용하고자하는 가상환경의 경로로 이동하지 않아도 된다는 것이다.   

> workon ENV

앞서 생성한 가상환경을 활성화 해보자. 

```bash
$ workon django_ex
(django_ex) $ 
```

### Deactivation Virtual Environment

가상환경을 비활성화하는 방법은 `virtualenv`와 동일하다.  

> deactivate ENV


## Check

* 다른 언어들은 예를들어, 자바는 class path C#, C++등은 dependency path 노드는 node_modules등을 통해 라이브러리를 격리한다. 직접 사용하면서 느낀것은 아예 환경자체를 분리하고 가상환경을 활성화 하고 비활성화할때 훅을 디렉토리 단계에서 관리할 수 있어서 편리한 면도 있는것 같은다.



# Reference

* [virtualenv](https://virtualenv.pypa.io/en/stable/)
* [virtualevnwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/#)
* [pyenv](https://github.com/pyenv/pyenv)
* [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv)
* [pyenv-virtualenvwrapper]()
* [Use different Python version with virtualenv](https://stackoverflow.com/questions/1534210/use-different-python-version-with-virtualenv)