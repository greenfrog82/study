# How to serve static files of Django in Apache

Django는 기본적으로 동적 데이터에 대한 처리를 수행할 뿐, 정적 데이터에 대한 처리는 수행하지 않는다.  
이는 정적 데이터를 다루는데 특화되어 있는 웹 서버에 책임을 맡기고, Django는 동적 데이터를 처리하는데 집중하도록 설계되어 있기 때문이다.   
Django가 동적 데이터처리에 특화되어 있다고 하더라도 개발환경에서는 웹 서버를 설정하고 실행하는 것이 번거롭기 때문에 개발 서버와 **django.contrib.staticfiles** 앱을 통해 간편하게 웹 서버를 실행하고 개발 중인 서비스를 테스트해 볼 수 있다.  

## Adding django.contrib.staticfiles Applicaiton

**django.contrib.staticfiles** 앱을 이용하기 위해서는 settings.py의 **INSTALLED_APPS** 설정에 다음과 같이 추가해주면 되다. 

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles', # django.contribe.staticfiles app was added to serve static files
    'helloapp'
]
```

## How to serve static files in development environment

본래 개발 서버는 개발자가 추가한 정적 데이터를 처리하지 못하고 오직 django.contrib.admin.static.admin의 정적 데이터만을 처리한다. 때문에 **django.contrib.staticfiles** 앱을 통해 개발자가 추가한 정적 데이터를 처리하게 된다. 좀 더 자세히 설명하면 **django.contrib.staticfiles** 앱은 django.core의 **runserver management command**를 override하여 개발 서버가 사용자가 정의한 정적 데이터를 처리할 수 있도록 한다. 

**django.contrib.staticfiles** settings.py를 통해 전달받는 몇몇 설정들이 존재하는데 일반적으로는 다음 세 가지 설정을 통해 사용자가 정의한 정적파일을 개발서버를 통해 처리하고 운영 환경에서 웹 서버에게 정적 파일의 경로를 제공한다. 

* STATIC_ROOT
* STATIC_URL
* STATICFILES_DIRS

### STATIC_ROOT

**django.conf.staticfiles** 앱의 **collectstatic** 명령을 통해 흩어져있는 정적 데이터를 하나의 경로에 모으기 위한 경로를 지정한다. 
Django의 프로젝트는 여러개의 앱들로 구성되어 있고, 각 앱마다 정적 데이터들을 **static**이라는 경로를 통해 저장한다. 그리고 공통으로 사용하는 정적 데이터들은 별도의 경로에 저장하게 된다.  
다음을 참고하자. 

```sh
$ tree
.
|-- db.sqlite3
|-- helloapp
|   |-- __init__.py
|   |-- __init__.pyc
|   |-- admin.py
|   |-- admin.pyc
|   |-- apps.py
|   |-- migrations
|   |   |-- __init__.py
|   |   `-- __init__.pyc
|   |-- models.py
|   |-- models.pyc
|   |-- static
|   |   `-- helloapp
|   |       `-- css
|   |           `-- hello.css
|   |-- templates
|   |   `-- hello.html
|   |-- tests.py
|   |-- views.py
|   `-- views.pyc
|-- manage.py
`-- mysite
    |-- __init__.py
    |-- __init__.pyc
    |-- settings.py
    |-- settings.pyc
    |-- static
    |   `-- shared
    |       `-- css
    |           `-- layout.css
    |-- urls.py
    |-- urls.pyc
    |-- wsgi.py
    `-- wsgi.pyc
```

위 경로를 살펴보면 사용자가 정의한 정적 데이터를 보관하고 있는 경로는 다음과 같다. 

* mysite/static/shared - 프로젝트 레벨에서 모든 앱이 공유하기 위한 정적 데이터를 보관하고 있는 경로.
* helloapp/static/helloapp - 앱 레벨에서 helloapp의 정적 데이터를 보관하고 있는 경로.

각각 정적 데이터를 보관하고 있는 경로를 살펴보면, static 경로 하위에 바로 css, js, img등의 경로를 두고 정적 데이터를 보관하면 될 것을 굳이 shared나 helloapp과 같이 레벨을 하나 더 두었는데 이것은 다 이유가 있다. 
**collectstatic** 명령을 사용하면 각 앱과 **STATICFILES_DIR** 설정에 설정 된 경로들의 정적 데이터들을 **STATIC_ROOT** 설정에 설정 된 경로에 
 모은다. 이때, 각 앱의 static 경로와 **STATICFILES_DIR** 설정에 설정 된 경로의 하위 경로의 디렉토리와 파일들을 모은다. 따라서 shared나 helloapp과 같이 레벨을 하나 더 두는것이다.
다음은 앞선 경로의 정적 데이터를 **collectstatic** 명령을 사용하여 정적 데이터를 모은 내용이다. 

```sh
.
|-- admin
|   |-- css
|   |   |-- base.css
|   |   |-- changelists.css
|   |   |-- dashboard.css
|   |   |-- fonts.css
|   |   |-- forms.css
|   |   |-- login.css
|   |   |-- rtl.css
|   |   `-- widgets.css
|   |-- fonts
|   |   |-- LICENSE.txt
|   |   |-- README.txt
|   |   |-- Roboto-Bold-webfont.woff
|   |   |-- Roboto-Light-webfont.woff
|   |   `-- Roboto-Regular-webfont.woff
|   |-- img
|   |   |-- LICENSE
|   |   |-- README.txt
|   |   |-- calendar-icons.svg
|   |   |-- gis
|   |   |   |-- move_vertex_off.svg
|   |   |   `-- move_vertex_on.svg
|   |   |-- icon-addlink.svg
|   |   |-- icon-alert.svg
|   |   |-- icon-calendar.svg
|   |   |-- icon-changelink.svg
|   |   |-- icon-clock.svg
|   |   |-- icon-deletelink.svg
|   |   |-- icon-no.svg
|   |   |-- icon-unknown-alt.svg
|   |   |-- icon-unknown.svg
|   |   |-- icon-yes.svg
|   |   |-- inline-delete.svg
|   |   |-- search.svg
|   |   |-- selector-icons.svg
|   |   |-- sorting-icons.svg
|   |   |-- tooltag-add.svg
|   |   `-- tooltag-arrowright.svg
|   `-- js
|       |-- SelectBox.js
|       |-- SelectFilter2.js
|       |-- actions.js
|       |-- actions.min.js
|       |-- admin
|       |   |-- DateTimeShortcuts.js
|       |   `-- RelatedObjectLookups.js
|       |-- calendar.js
|       |-- cancel.js
|       |-- change_form.js
|       |-- collapse.js
|       |-- collapse.min.js
|       |-- core.js
|       |-- inlines.js
|       |-- inlines.min.js
|       |-- jquery.init.js
|       |-- popup_response.js
|       |-- prepopulate.js
|       |-- prepopulate.min.js
|       |-- prepopulate_init.js
|       |-- timeparse.js
|       |-- urlify.js
|       `-- vendor
|           |-- jquery
|           |   |-- LICENSE-JQUERY.txt
|           |   |-- jquery.js
|           |   `-- jquery.min.js
|           `-- xregexp
|               |-- LICENSE-XREGEXP.txt
|               |-- xregexp.js
|               `-- xregexp.min.js
|-- helloapp
|   `-- css
|       `-- hello.css
`-- shared
    `-- css
        `-- layout.css
```

### STATIC_URL

정적 데이터를 참조하기 위한 URL을 설정한다.  
예를들어, /static/과 같은 경로를 설정하며, 설정하는 경로는 반드시 '/'로 끝나야한다. 
만약, 해당 설정을 하지 않으면 다음과 같은 에러가 발생한다. 

```sh
Unhandled exception in thread started by <function wrapper at 0x7fa4985de6e0>
Traceback (most recent call last):
  File "/usr/local/lib/python2.7/dist-packages/django/utils/autoreload.py", line 228, in wrapper
    fn(*args, **kwargs)
  File "/usr/local/lib/python2.7/dist-packages/django/core/management/commands/runserver.py", line 147, in inner_run
    handler = self.get_handler(*args, **options)
  File "/usr/local/lib/python2.7/dist-packages/django/contrib/staticfiles/management/commands/runserver.py", line 32, in get_handler
    return StaticFilesHandler(handler)
  File "/usr/local/lib/python2.7/dist-packages/django/contrib/staticfiles/handlers.py", line 20, in __init__
    self.base_url = urlparse(self.get_base_url())
  File "/usr/local/lib/python2.7/dist-packages/django/contrib/staticfiles/handlers.py", line 24, in get_base_url
    utils.check_settings()
  File "/usr/local/lib/python2.7/dist-packages/django/contrib/staticfiles/utils.py", line 52, in check_settings
    "You're using the staticfiles app "
django.core.exceptions.ImproperlyConfigured: You're using the staticfiles app without having set the required STATIC_URL setting.
```

### STATICFILES_DIRS

각 앱의 static 이외의 경로의 정적 데이터를 설정하기 위한 설정이다. 해당 설정은 배열을 통해 여러 경로를 전달할 수 있다.  
다음을 참조하자.

```python
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'mysite/static'),
]
```

해당 설정에 설정 된 정적 데이터 경로는 **collectstatic** command를 통해 모여지는데, 이 명령이 아니더라도 개발 서버에서 각 앱의 static 이외의 경로의 정적 데이터를 참조하기 위해서도 사용된다.  
만약, 개발 서버를 사용할 때 해당 설정을 설정하지 않는다면 각 앱의 static 경로 이외의 정적 데이터들은 처리되지 않는다. 

#### prefix

STATICFILES_DIRS 설정에 설정하는 경로들에 별명을 줄 수 있다. 예를들어, 정적 데이터를 보관하고 있는 경로명이 적절하지 않고 해당 경로의 이름을 바꾸기 어려운 상황이라면 이 기능을 이용하여 정적 데이터를 보관하고 있는 경로명을 놀리적으로 바꿀 수 있다.  
이렇게 별명을 주게되면 **collectstatic** command를 통해 해당 별명으로 경로를 생성한다. 이때 주의할 점은 별명을 사용하기 전 설정과 달리 한 레벨 깊이 들어간 경로명을 전달해줘야한다는 것이다.  
다음을 참조하자.

```python

STATICFILES_DIRS = [
    ('media', os.path.join(BASE_DIR, 'mysite/static/shared')),
]
```

## How to serve static files in production environment with apache web server

웹 서버에서 정적 데이터를 처리하기 위해서는 **collectstatic** command를 통해 STATIC_ROOT에 설정 된 경로에 모아둔 정적 데이터를 이용한다.  

우선 다음과 같이 **collectstatic** command를 통해 정적 데이터를 STATIC_ROOT에 설정 된 경로에 모은다. 

>$ ./manage.py collectstatic

위 명령을 통해 STATIC_ROOT에 설정 된 경로에 정적 데이터가 모였으면, 아파치 웹 서버의 Alias directive와 Directory directive를 통해 웹 서버가 정적 데이터를 처리하도록 한다. 

```xml
Alias /static /develop/static

<Directory /develop/static>
        Require all granted
</Directory>
```

## How to use static file path in template

앞선 설정을 통해 설정 된 정적 데이터를 Django 템플릿에서는 어떻게 사용해야할까? 다음 두 가지 방법이 있다. 

1. Hard coding static file path
2. Using static template tag

### Hard coding static file path

**STATIC_URL** + **STATIC_ROOT** 설정의 하위경로를 사용하여 정적 데이터 경로를 전달한다. 
하지만 이 방법은 권장되지 않는데 **STATIC_URL**의 경로가 변경되는 경우 이 방법이 적용된 모든 경로를 수정해주어야하기 때문이다. 

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Hello</title>
    <link rel="stylesheet" type="text/css" href="/static/helloapp/css/hello.css">
    <link rel="stylesheet" type="text/css" href="/static/shared/css/layout.css">
</head>
<body>
    <h1>Hello</h1>
</body>
</html>
```

### Using static template tag

static template tag를 사용하면 **STATIC_URL**에 설정 된 경로를 대입해준다. 따라서 다음과 같은 형식으로 정적 데이터 경로를 전달할 수 있다.  

>{% satic + "**STATIC_ROOT** 설정의 하위경로" %}

일반적으로는 이 방법을 통해 Django template에 정적 파일 경로를 지정해주는것이 좋다. 


```html
{% load static %}
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Hello</title>
    <link rel="stylesheet" type="text/css" href="{% static "/helloapp/css/hello.css" %}">
    <link rel="stylesheet" type="text/css" href="{% static "/shared/css/layout.css" %}">
</head>
<body>
    <h1>Hello</h1>
</body>
</html>
```


## Reference

* [The staticfiles app](https://docs.djangoproject.com/en/1.11/ref/contrib/staticfiles/#module-django.contrib.staticfiles)
* [Managing static files (e.g. images, JavaScript, CSS)](https://docs.djangoproject.com/en/1.11/howto/static-files/)
* [Understanding, setting up, accessing and serving media files and static files in Django](https://timmyomahony.com/blog/static-vs-media-and-root-vs-path-in-django/)