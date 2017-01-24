# Translation - Message file 컴파일하기

## 개발 환경

* Ubuntu 14.04
* PyCharm 2016.3.2
* Python 2.7
* Django 1.3.0

## 문제

Django의 [Translation](https://docs.djangoproject.com/en/1.10/topics/i18n/translation/) 기능을 통해 메시지를 출력하고자 했는데, 메시지 파일에 정의한 데이터가 출력되지 않고 [translation string](https://docs.djangoproject.com/en/1.10/topics/i18n/#term-translation-string)만 계속 출력된다.

[Translation](https://docs.djangoproject.com/en/1.10/topics/i18n/translation/)을 처리하기 위한 설정을 모두 확인해봐도 잘못된 내용을 찾지 못했다.

## 해결

Django의 [Translation](https://docs.djangoproject.com/en/1.10/topics/i18n/translation/) 문서의 Overview 중간에 다음과 같은 글이있다.

>Django then provides utilities to extract the translation strings into a message file. This file is a convenient way for translators to provide the equivalent of the translation strings in the target language. Once the translators have filled in the message file, it must be compiled.

메시지 파일은 반드시 컴파일 되어야한다는 것이다.

다음 명령을 통해 메시지 파일을 컴파일하니 정상적으로 동작한다.

> django-admin compilemessages

## 참조

* [Translation](https://docs.djangoproject.com/en/1.10/topics/i18n/translation/)
