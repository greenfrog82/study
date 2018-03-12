# How to serve static files of Django in Apache

Django는 기본적으로 동적 데이터에 대한 책임을 질 뿐 정적 데이터에 대해서는 책임을 지지 않는다.
따라서 개발환경에서는 **django.conf.staticfiles** app을 통해 static file을 서빙하고 운영환경에서는 Django application의 static 파일 경로를 **Alias**하여 서빙해야한다.  

## How to serve static files in development environment

개발환경에서는 **django.conf.staticfiles** app을 통해 static file을 서빙할 수 있다.  
해당 app은 django.core의 **runserver management command**를 override하여 다음 keyword의 정보를 이용하여 static file을 서빙한다. 

* STATIC_ROOT
* STATIC_URL
* STATICFILES_DIRS

### STATIC_ROOT

**django.conf.staticfiles** app의 **collectstatic** 명령을 통해 흩어져있느냐 static files을 모으기 위한 경로.  
Django의 프로젝트는 여러개의 app들로 구성되어 있고, 각 app마다 static file들을 **static**이라는 경로에 저장한다. 그리고 공통으로 사용하는 static file등은 별도의 경로에 저장하는데 Apache를 통해 이렇게 흩어져있는 static files을 서빙하기 위해서는 수많은 **Alias** 설정이 필요할 것이다.  
이러한 불편은 없애기 위해 **STATIC_ROOT**키에 경로를 설정해두고 **collectstatic** 명령을 사용하면 여기에 설정 된 경로로 static files을 모아준다.  

**STATIC_ROOT**키에 경로를 설정된 경로에 **collectstatic**명령을 통해 모아지는 static files들은 Django admin과 각 app의 static 경로 그리고 **STATICFILES_DIRS**키에 설정된 경로의 static files들이다.  

### STATIC_URL

서비스 되는 어플리케이션의 static url 

### STATICFILES_DIRS



## How to serve static files in production environment

## Reference

* [The staticfiles app](https://docs.djangoproject.com/en/1.11/ref/contrib/staticfiles/#module-django.contrib.staticfiles)
* [Managing static files (e.g. images, JavaScript, CSS)](https://docs.djangoproject.com/en/1.11/howto/static-files/)
* [Understanding, setting up, accessing and serving media files and static files in Django](https://timmyomahony.com/blog/static-vs-media-and-root-vs-path-in-django/)