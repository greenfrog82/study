# 5. Settings and Requirements Files

이번 장은 settings.py와 requirements.txt 파일을 여러가지 환경(dev, each development in dev, QA, live)에서 다루는 방법에 대해서 설명한다. 예전에 관련 내용을 살펴본적이 있는데 다음 문서이며, envrionment variable를 관리하는 다루는 것과 다양한 환경에서 requirements.txt 파일을 다루는 내용을 빼면 동일한 내용을 다루고 있다.   

* [How to manage settings.py for multiple environment](../../manage_settings/multiple_env/readme.md)

기본적으로 설정파일을 다루는데 있어서 다음 세가지 원칙을 따라야한다. 

* 모든 설정 파일은 VCS에서 관리되어야한다. 
* 모든 설정 파일은 DRY(Don't Repeat Yourself.)해야한다. 
* 모든 secret key는 VCS의 관리에서 **제외**되어야한다. 

## 5.1 Avoid Non-Versioned Local Settings.

간단히 여러환경에서의 환경 설정을 관리하는 방법은 단순히 각각의 환경에서 VCS에서 관리되는 환경설정파일을 override하여 VCS에 올려두지 않고 사용하거나, 환경설정파일을 import해서 자신만의 로컬 환경설정파일을 만들고 역시 VCS에서 관리하지 않는것이다.   

이를 **local_settings anti-pattern**이라고 한다.  

이러한 방법을 사용하면 다음과 같은 문제가 있을 수 있다.   

일단 모든 개발환경에서 VCS에서 관리되지 않는 환경설정 파일들이 존재하게 된다.   
따라서, 환경설정 파일들이 관리되지 않아 운영환경에 반영되어야하는 설정이 개발환경에만 설정되거나 운영환경에서 영향을 줄 수 있는 환경설정이 개발환경에만 되어 장애로 이어지는 등의 문제가 있을 수 있다.  
결국 이러한 환경설정으로 인한 문제는 버그를 찾기 어렵게 하기 때문에 장애가 발생했을 때 문제를 찾기가 어려워진다.  

## 5.2 Using Multiple Settings File

예전에 공부해서 적용햇었던 다음 문서의 내용과 동일 

* [How to manage settings.py for multiple environment](../../manage_settings/multiple_env/readme.md)

**CHECK**

TIP : DJANGO_SETTINGS_MODULES and PYTHONPATH 이하 내용 이해가 안됨 .. 

## 5.3 Separate Configuration From Code

`local_settings anti-pattern`의 원인 중 하나는  `securet_key`들을 환경설정 파일에서 관리하는데 있다.  

* 설정은 배포하는 환경에 따라 달라지지만, 코드는 그렇지 않다.
* `Secret Keys`는 환경설정 값이지 코드가 아니다 
* `Secret keys`는 말 그대로 **secret**인데 이를 VCS에서 관리한다면 VCS에 접근할 수 있는 사람이라면 누구나 `Secret Keys`를 알 수 있고 이는 보안사고로 이어질 수 있다.  
* Platforms-as-a-service usually don’t give you the ability to edit code on individual servers. Even
if they allow it, it’s a terribly dangerous practice. ??

이러한 문제를 해결하기 위해서는 `The Environment Variables Pattern`을 사용한다.   
이는 OS에서 제공하는 환경변수를 통해 `Secret Keys`를 관리하는 방법으로 이들 내용은 VCS에서 관리하지 않는다.   

이를 이용하면 다음과 같은 이점들이 있다.

* `Secret Keys`를 환경설정파일과 분리하므로서 환경설정파일을 보안 이슈 없이 VCS에 올려 사용할 수 있다. 모든 파이썬 코드들은 settings(환경설정)을 포함해서 모두 VCS에서 관리되어야한다.  
* 이를 통해 환경설정 파일들이 VCS에서 관리되면 각 환경에서 복사되어 쉽게 outdated되고 관리되지 않는 local_settings.py.exampler과 같은 설정파일을 사용하지 않아도 된다. 
* 시스템 관리자는 환경설정 파일을 수정할 필요없이 쉽고 빠르게 배포할 수 있다. 
* 대부분의 PaaS에서 이와같은 접근 방법을 추천한다.   

**CHECK**

TIP: 12 Factor App: Store Config in the Environment 읽어보기.

### 5.3.1 A Caution Before Using Environment Variables for Secrets

secrets을 위한 Environment Variables를 사용하기 전에 다음 두 가지 내용들을 숙지하고 있어야한다. 

* 보안 정보들을 저장할 수 있는 방법.
* 서버에서 shell이 environment variables을 어떻게 동작시키는지에 대해서 잘 알거나, 여러분의 서비스가 PaaS에서 동작되고 있어야한다.  

>Environment Variables Do Not Work With Apache
만약 여러분의 운영환경이 아파치 웹 서버를 사용하고 있다면, 앞으로 설명할 Environment Variables이 동작하지 않음을 알 수 있을 것이다. 이는 아파치가 자신만의 environment varialbe system을 가지고 있기 때문이다.  

**CHECK**

For more information 관련 된 내용 좀 더 공부해볼 것.  
(Minor)그리고 `Environment Variables Do Not Work With Apache`에서 실제로 문제가 발생할 수 있는 경우는 무엇인지 알아보자.

### 5.3.2 How to Set Environment Variables Locally

다음과 같이 Environment Variables을 .bashrc, .bash_profile, .profile등에 작성해주면 된다.

```bash
export SOME_SECRET_KEY=1c3-cr3am-15-yummy .
export AUDREY_FREEZER_KEY=y34h-r1ght-d0nt-t0uch-my-1c3-cr34m
```

**CHECK** 

* 책에서는 `bash`를 기준으로 이야기하고 있는데 `zsh`을 사용하는 경우 책에서 나오는 설명과 Environment Variables를 다루는 방법이 다른가? 
* When dealing with multiple projects using the same API but with different keys, you can also place these at the end of your virtualenv’s bin/activate script
* TIP: virtualenvwrapper Makes This Easier 

## 5.3.3 How to Set Environment Variable in Production 

앞서 설명한것과 같이 Environment Variable의 사용은 서버마다 다를 수 있다. 따라서 각 서버에 설정 된 환경과 툴에 따라 `Environment Variable`을 사용하는 정확한 방법은 달라질 수 있다.   

PaaS 서비스 중 하나인 Heroku를 사용하고 있다면, 다음과 같이 `Environment Variable`을 작성할 수 있다.   

```bash
$ heroku config:set SOME_SECRET_KEY=1c3-cr3am-15-yummy
```

이를 Python Shell에서 실행해보면 다음과 같다.   
```bash
>>> import os
>>> os.environ['SOME_SECRET_KEY']
c3-cr3am-15-yummy
```

앞서 생성한 `Environment Variable`을 환경설정 파일에서 사용하는 방법은 다음과 같다.   

```python
# Top of settings/production.py
import os
SOME_SECRET_KEY = os.environ['SOME_SECRET_KEY']
```

## 5.3.4 Handling Missing Secret Key Exceptions 

**CHECK**

여기서는 단순히 KeyError가 발생하기 때문에 책에서 소개하는것과 같이 get_env_variable 함수와 같은 함수를 통해 환경변수에 접근하라고 하지만 실제로 문제를 찾는것이 어렵지 않다.  
이러한 접근이 필요한가??

다음은 실제로 KeyError 발생 시 찍히는 TraceBack이다. 

```python
Traceback (most recent call last):
  File "devmanage.py", line 17, in <module>
    import settings
  File ".../settings/__init__.py", line 40, in <module>
    execfile(SETTINGS_FILE)
  File ".../settings/localdev.py", line 4, in <module>
    TEST = os.environ['test']
  File ".../.virtualenv/yogiyo/lib/python2.7/UserDict.py", line 23, in __getitem__
    raise KeyError(key)
KeyError: 'test'
```

TIP: Using django-admin.py Instead of manage.py 에서 django-admin.py를 사용하라고 하고 밑에서는 manage.py를 사용하지 말라고 되어있는데 이게 무슨소리이며, django-admin.py를 사용하는 이유가 뭐지?

## 5.4 When You Can't Use Environment Variables 

`Envorinment Variable`을 사용할 수 없는 경우 `Secrets File Pattern`을 사용할 수 있다. 해당 패턴을 간단히 설명하면 VCS에서 관리되지 않는 non-executable 파일에 `secret` 정보를 보관하는 것이다. 이를 구현하기 위해서는 다음 세가지 항목을 따라야한다.  

1. JSON, YAML 또는 XML등을 통해 secret 파일을 생성한다.   
2. secret 파일 형식을 로딩하기 위한 loader를 settings에 import한다.  
3. VCS에서 해당 파일이 관리되지 않도록 설정한다. (feat. .gitignore)

### 5.4.1 Using JSON Files

JSON 파일을 통해 `Secrets File`을 만드는 방법에 대해서 설명한다. 


## 5.5 Using Multiple Requirements Files

마지막으로 다양한 환경설정을 관리하는데 알아야하는것은 각각의 환경설정 파일을 자신의 requirements 파일을 가지고 있어야한다는 것이다. 이것은 각 서버에서 필요한것을 설치하기 위함이다.  

먼저, 다음과 같이 `repository_root`에 환경설정 파일에 대응하는 requirements.txt파일을 생성한다.  

```
requirements/
    base.txt
    local.txt
    staging.txt
    production.txt
```

base.txt 파일은 공통 패키지들이 관리되는 파일이다. 예를들어, 다음과 같은 패키지들이 있다고 가정하자. 

```
Django==1.8.0
psycopg2==2.6
djangorestframework==3.1.1
```

local.txt는 로컬 개발환경을 위한것으로 `-r`옵션과 함께 import하고자 하는 requirements file을 명시하면 requirements file을 import할 수 있다.  
예를들어 base.txt를 import한 local.txt 파일은 다음과 같다.  

```
-r base.txt # includes the base.txt requirements file

coverage==3.7.1
django-debug-toolbar==1.3.0
```

다른 파일들도 필요에 따라 위와 같은 패턴으로 생성해주면 된다.   

### 5.5.1 Installing From Multiple Requirements Files

앞서 생성했던 local.txt를 통해 패키지 파일을 설치해보자.  

```bash
$ pip install -r requirements/local.txt
```

**CHECK**

결국에 Environment Variables을 관리하는 파일들은 어디서 관리하라는거지? 예전에 공부했을 때는 각각의 개발환경을 통해 공유하라고 했는데 그러면 설정의 불일치가 있을 수 있고 관리가 어렵지 않나?

## 5.6 Handling File Paths in Setttings

다양한 설정파일 관리하는 경우 설정에 지정 된 파일 경로가 변경되는 경우 다른 설정 파일들에서 이를 알 수가 없어서 문제가 되는 경우가 있다. 이를 해결하는 방법에 대해서 설명한다.  

다음과 같이 설정파일에 경로를 Hard Coding하지 말아라. 

```python
# settings/base.py
# Configuring MEDIA_ROOT
# ’DONT DO THIS! Hardcoded to just one user's preferences
MEDIA_ROOT = "/Users/pydanny/twoscoops_project/media"
# Configuring STATIC_ROOT
# ’DONT DO THIS! Hardcoded to just one user's preferences
STATIC_ROOT = "/Users/pydanny/twoscoops_project/collected_static"
# Configuring TEMPLATES
# ’DONT DO THIS! Hardcoded to just one user's preferences
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        DIRS = ("/Users/pydanny/twoscoops_project/templates",)
    }, 
]
```

## 5.7 Summary

**security related values**들은 반드시 VCS를 통해 관리되어서는 안된다.  
각 환경에 맞는 환경설정과 requirements를 관리해라.





# Reference

* [How to manage settings.py for multiple environment](../../manage_settings/multiple_env/readme.md)