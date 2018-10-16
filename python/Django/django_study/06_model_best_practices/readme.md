# 6. Model Best Practices

모델은 대부분의 Django 프로젝트들의 근간이다. 그런데 너무나 많은 개발자들이 파급효과에 대한 고려없이 모델을 생성하고 수정하는데 급급한다. 우리의 코드 베이스로 던져진 급한 수정 또는 엉성한 임시적 디자인들은 수 개월 혹은 수년 안에 말도 안되는 해결책을 사용하거나 기존 데이터를 망가뜨리는 등 우리를 괴롭히게 될 것이다.   

따라서 모델을 생성하거나 수정할 때 한가지만 명심하자. 

>시간을 가져라. 그리고 이를 통해 프로젝트의 근간이 되는 모델을 가능하면 강력하고 견고하게 디자인해라.

### PACKAGE TIP

* [django-model-utils](https://django-model-utils.readthedocs.io/en/latest/index.html)은 Django 모델을 위한 믹스인과 유틸리티들을 제공한다.  
* [django-extensions](https://django-extensions.readthedocs.io/en/latest/index.html)는[shell_plus](https://django-extensions.readthedocs.io/en/latest/shell_plus.html)라는 강력한 관리 커맨드를 제공한다. 이 툴은 설치 된 모든 앱의 모델을 자동으로 로드해준다. 이 툴은 작은 기능에만 집중하는 다른 툴들과는 달리 많은 기능을 포함하는 단점을 가지고 있다.  

## 6.1 Basics

### 6.1.1 Break Up Appas With Too Many Models

만약 하나의 앱에 20개 이상의 모델이 존재한다면, 해당 앱을 작게 쪼갤것을 고려해야한다. 이미 너무 많은 역할을 하고 있는 것이다. **앱당 모델의 수가 5개를 넘지 않도록 하자.**

### 6.1.2 Be Careful With Model Inheritance

Django에서 모델의 상속은 까다로운 주제이다. Django는 **abstract base classes**, **multi-table inheritance** 그리고 **proxy models** 3가지 상속 방법을 제공한다. 

**CHECK**

책에서 Django Abstract Base Classes와 Python Abstract Base Classes가 완전히 다른 목적과 동작을 가지고 있다고 했는데 그게 어떤거지?

#### No model inheritance

Django의 models.Model만을 상속해서 모델을 생성하는 방법으로 다음과 같은 경우.

```python
class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
```

**Pros**

* Django의 모델이 DB Table과 어떻게 맵핑되는지 이해하기 쉽다. 

**Cons**

* 여러개의 모델이 공통으로 사용하는 필드가 존재할 때 관리가 힘들어진다.  

#### Abstract base classes

공통된 필드와 동작을 상속하기 위한 클래스로 상속하지 않고 인스턴스를 생성할 수 없다.  
다음과 같이 구현된다.   

```python
class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
```

**Pros**

공통된 필드를 필요로 하는 모델이 있다면 이를 재사용할 수 있다.   
다중상속으로 인해 발생하는 추가적인 테이블과 조인의 오버헤드가 발생하지 않는다.

**Cons**

부모 클래스는 단독으로 사용할 수 없다.

#### Multi-table inheritance

??
다음과 같은 경우를 이야기하는건지 .. 아니면 TimeStampeModel과 같은 모델을 다중 상속하는 건지 ... 아니면 abstract class를 다중상속하는건지 ... 

```python
class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


class Flavor(TimeStampedModel):
    title = models.CharField(max_length=200)
```

#### Proxy models

?? 이게 뭔지 전혀 ... 모르겠다. 

다음은 언제 어떤 타입의 상속을 사용해야하는가에 대한 간단한 규칙이다.

* 여러분이 오직 몇 개의 모델들을 가지고 있고 하나 또는 두개의 분명한 필드들이 중복된다면, 굳이 상속이 필요없다. 그저 필요한 필드를 몇 개의 모델에 추가해주면 된다. 
* 모델간에 반복되는 모델의 유지보수가 혼란이나 의도하지 않는 실수를 야기한다면, 대부분의 경우 **abstract base model**로 공통 필드를 옮겨야한다.  
* Proxy model ... ??
* 혼란과 상당한 오버헤드를 발생시키기 때문에, 반드시 **multi-table inheritance**는 피해야한다. 차라리 명시적인 `OneToOneFields`나 `ForeignKeys`를 사용해라. 

#### TODO

Proxy Model 실

### 6.1.3 Model Inheritance in Practice: The TimeStampedModel

Djagno 프로젝트의 모든 모데에서 **created**와 **modified** timestamp 필드 포함하는것은 아주 일반적이다. 이러한 필드를 각각 그리고 모든 모델에 수동으로 추가할 수 있지만, 이는 많은 작업량을 필요로하고 휴먼 에러를 발생시킬 위험을 가지고 있다. 이에 대한 좋은 해결 방법은 이러한 `TimeStampedModel`이라는 공통 필드를 모아놓은 **abstract  base class**를 작성하는 것이다.  

```python
# my_app/models.py
from djagno.db import models

class TimeStampModel(models.Model):
    """
    An abstract base class model that provides self-
    updating ``created`` and ``modified`` fields.
    """   
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
```

위 코드에서 우리는 Meta 클래스의 abstract = True 코드에 주목할 필요가 있다. 이 코드가 TimeStampModel을 **abstract class**로 만든다. 

**TimeStampModel**을 상속받아서 새로운 클래스를 만든 경우, `migrate`를 수행했을 때 **core_timestampedmodel** 테이블을 생성하지 않는다.   

```python
# my_app/models.py
from django.db import models

from core.models import TimeStampedModel

class Flavor(TimeStampedModel):
    title = models.CharField(max_length=200)
```

위 모델은 오직 **flavors_flavor** 테이블만을 생성한다. 이것은 정확히 우리가 원하는 동작이다. 

다음은 위 모델을 `migrate` 했을 때 DB에 생성된 테이블이다.  
Django의 기본적인 테이블 이외에 **my_app_flavor**가 추가된 것을 알 수 있고, 스키마를 확인해보면 **abstract class**인 TimeStampedModel에 정의된 **created**와 **modified** 필드가 포함되어 있는것을 알 수 있다. 

```bash
sqlite> .tables
auth_group_permissions      django_content_type
auth_permission             django_migrations
auth_user                   django_session
auth_user_groups            my_app_flavor
auth_user_user_permissions

sqlite> .schema my_app_flavor
CREATE TABLE "my_app_flavor" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "created" datetime NOT NULL, "modified" datetime NOT NULL, "title" varchar(200) NOT NULL);
```

반면에, TimeStampedModel을 **abstract class**로 만들지 않고 **concreate base class**로 생성한 후 위와 같이 상속한다면 **my_app_timestampedmodel** 이블이 생성된다. 뿐만 아니라 TimeStampedModel을 하위 클래스들은 TimeStampedModel의 필드를 갖지 않고 ForeignKey 제약 조건이 걸려있는 것을 알 수 있다. 

```bash
sqlite> .tables
auth_group                  django_admin_log
auth_group_permissions      django_content_type
auth_permission             django_migrations
auth_user                   django_session
auth_user_groups            my_app_flavor
auth_user_user_permissions  my_app_timestampedmodel

sqlite> .schema my_app_timestampedmodel
CREATE TABLE "my_app_timestampedmodel" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "created" datetime NOT NULL, "modified" datetime NOT NULL);

sqlite> .schema my_app_flavor
CREATE TABLE "my_app_flavor" ("timestampedmodel_ptr_id" integer NOT NULL PRIMARY KEY REFERENCES "my_app_timestampedmodel" ("id") DEFERRABLE INITIALLY DEFERRED, "title" varchar(200) NOT NULL);
```

기억해라, **concreate base class**를 상속하는 것은 데이터에 접근할 때 join을 해야하기 때문에 성능이 좋지 않다. 

## 6.1.4 Database Migrations

Django는 **migrations**라고 불리는 강력한 데이터베이스 변경 전파 라이브러리를 가지고있다. 이는 `django.db.migrations` 모듈이다. Django 1.7부터 `django.db.migrations`는 third-party 라이브러리인 `South`로 대체되었지만, 두 라이브러리의 개발자(Andrew Godwin)가 동일하므로 사용법은 매우 유사하다.  

Django의 모델을 **migrations**할 때의 팁!

* 새로운 앱이나 모델이 생성되었을 때, 다음 코드를 통해 새로운 모델에 대한 초기 `django.db.migrations`를 생성해라.  
  >$ python manage.py makemigrations
    * ?? makemigrations가 정확히 어떤 동작을하는지 설명이 필요 .. 
    * 일단 내가 알기로는 migration을 위한 코드를 만드는 과정 그리고 이러한 코드들이 migrations 경로에 남아 이력이되어 rollback이 가능하도록 하는 것.
* 모델의 변경이 심한 경우 `makemigrations`명령을 통해 생성 된 migration code를 실행하기 전에 검토해봐라. 또한 `sqlmigrate` 명령을 통해서 migration code를 실행할 때 생성되는 쿼리를 확인하여라. 
    * ?? 이렇게 쿼리를 보는것이 실제 테이블이 어떻게 생성되는지 확인할 수 있어서 굉장히 중요해보이는데 실제로 이러한 작업을 하는지? 이걸 DBA에게 줘서 뭔가 확인해달라.
* 자신의 migration 로직을 가지고 있지 않은 third-party app에 대한 migration의 작성을 관리하기 위해서는 `MIGRATION MODULES` 설정을 사용해라. 
    * ?? 아 .. 이건 또 뭐지 .... ????????????
* migration code가 관리하기 어려울만큼 늘어난다면 `squashmigrations`명령을 통해 해결할 수 있다.
    * ?? 이건 또 ... what the fuck!

### Migration Commands 

**TODO**

-delete-ghost-migrations 에 대해서 알아보기

**CHECK**
아래 명령들에 대응하는 Django 1.4의 명령들은 무엇인가?

다음 Migration 관련 명령들을 알아보기 전에 다음 모델을 통해 이를 설명한다 

```python
# my_app.models.Article
class Article(models.Model):
    content = models.CharField(max_length=200)
```

#### [sqlmigrate command](https://docs.djangoproject.com/en/2.1/ref/django-admin/#sqlmigrate)

`makemigrations` 명령을 통해 생성 된 migration code가 실행될 때 DB로 전달하기 위한 쿼리를 확인하게 해준다.   
이 명령은 Django Project가 사용하는 데이터베이스의 활성화된 연결을 필요로하며, 이 연결은 제약조건의 이름을 확인하는데 사용된다. 즉 여러분은 나중에 적용하고자하는 데이터베이스 사본에 대해서 쿼리를 만들어야한다. (<-- 이게 뭔 소리임?)

사용법은 다음과 같다.  

>$ django-admin sqlmigrate app_name migration_name

**Parameter(s)**

* app_name : Django app 이름
* migration_name : 확인하고자하는 migration code의 이름 `showmigrations` 명령으로 쉽게 확인할 수 있다.  
* --backwards : `sqlmigrate` 명령은 기본적으로 `forwards`에 대한 쿼리를 보여준다. `--backwards` 파라메터를 전달하면 `backwards`에 대한 쿼리를 보여준다.
* --database DATABASE : Django에 모델이 여러개 연결되어 있다면, 쿼리를 확인하기 위한 모델을 정의할 수 있다.  

**Example**

새로 작성한 `Article`모델을 makemigration을 통해 migration code를 생성한 후 이에대한 `forwards` 쿼리를 확인해보자.  

```bash
$ python3 manage.py makemigrations
Migrations for 'my_app':
  my_app/migrations/0002_article.py
    - Create model Article
$
$ python3 manage.py sqlmigrate my_app 0002_article
BEGIN;
--
-- Create model Article
--
CREATE TABLE "my_app_article" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "content" varchar(200) NOT NULL);
COMMIT;
```
  
이번에는 `--backwards` 파라메터를 통해 `backwards` 쿼리를 확인해보자.  

```bash
$ python3 manage.py sqlmigrate my_app 0002_article --backwards
BEGIN;
--
-- Create model Article
--
DROP TABLE "my_app_article";
COMMIT;
```

#### [showmigrations](https://docs.djangoproject.com/en/2.1/ref/django-admin/#showmigrations)

Django 프로젝트의 모든 migration 목록을 출력한다.   
사용방법은 다음과 같다. 

> django-admin showmigrations [app_name [app_name ...]]

다음 파라메터를 통해서 migration 목록을 출력하는 방법을 달리할 수 있다. **아래 두 옵션(-l, -p)은 함께 사용할 수 없다.**

* --list, -l (default)
    Django가 알고 있는 모든 앱의 migration 목록을 출력한다. migration이 적용된 migration code앞에는 [X]표시가 있고, 그렇지 않은 경우 []가 표시된다.
* --plan, -p
    Djagno가 migration을 적용하는 순서에 따라 migration 목록을 보여준다. `--list` 파라메터와 동일하게 migration의 적용여부를 표시한다.  
* --database DATABASE
    Django에 모델이 여러개 연결되어 있다면, migration 목록을 확인하기 위한 모델을 정의할 수 있다.  

**Example**

다음은 Django의 모든 앱의 migration 목록을 출력한것이다. 

```bash
$ python3 manage.py showmigrations
admin
 [X] 0001_initial
 [X] 0002_logentry_remove_auto_add
 [X] 0003_logentry_add_action_flag_choices
auth
 [X] 0001_initial
 [X] 0002_alter_permission_name_max_length
 [X] 0003_alter_user_email_max_length
 [X] 0004_alter_user_username_opts
 [X] 0005_alter_user_last_login_null
 [X] 0006_require_contenttypes_0002
 [X] 0007_alter_validators_add_error_messages
 [X] 0008_alter_user_username_max_length
 [X] 0009_alter_user_last_name_max_length
contenttypes
 [X] 0001_initial
 [X] 0002_remove_content_type_name
my_app
 [X] 0001_initial
 [ ] 0002_article
sessions
 [X] 0001_initial
```

다음은 my_app의 migration 목록을 출력한것이다. 

```bash
$ python3 manage.py showmigrations my_app
my_app
 [X] 0001_initial
 [ ] 0002_article
```

마지막으로 Django의 모든 앱의 migration 목록의 적용순서대로 출력한것이다.  

```bash
$ python3 manage.py showmigrations -p
[X]  contenttypes.0001_initial
[X]  auth.0001_initial
[X]  admin.0001_initial
[X]  admin.0002_logentry_remove_auto_add
[X]  admin.0003_logentry_add_action_flag_choices
[X]  contenttypes.0002_remove_content_type_name
[X]  auth.0002_alter_permission_name_max_length
[X]  auth.0003_alter_user_email_max_length
[X]  auth.0004_alter_user_username_opts
[X]  auth.0005_alter_user_last_login_null
[X]  auth.0006_require_contenttypes_0002
[X]  auth.0007_alter_validators_add_error_messages
[X]  auth.0008_alter_user_username_max_length
[X]  auth.0009_alter_user_last_name_max_length
[X]  my_app.0001_initial
[ ]  my_app.0002_article
[X]  sessions.0001_initial
```

### [squashmigrations](https://docs.djangoproject.com/en/2.1/ref/django-admin/#squashmigrations)

....

### [MIGRATION_MODULES Migration Settings](https://docs.djangoproject.com/en/2.1/ref/settings/#migration-modules)

Default: {} (Empty dictionary)

dictionary는 특정 앱이 사용할 migration module을 정의한다. 이 설정의 기본값은 빈 dictionary로 migraiton을 위한 Django default package 이름이 설정된다.  

**Example:**

아래와 같이 설정한 경우 blog앱은 blog.db_migrations 모듈을 통해 migration을 수행한다.  

```python
MIGRATION_MODULES = {
    'blog': 'blog.db_migrations',
}
```

만약 특정 앱에 `None`을 적용하면, 해당 앱의 마이그레이션은 무시된다.  
다음 에제를 보자. my_migration이라는 앱을 만들고 DummyModel을 생성하였지만, migration code가 생성되지 않느다.   

```bash
$ python3 manage.py startapp my_migration
```
```python
# my_migration.models.DummyModel
from django.db import models

class DummyModel(models.Model):
    data = models.IntegerField()
```
```python
# my_site.settings

MIGRATION_MODULES = {
    'my_migration': None
}
```
```bash
$ python3 manage.py makemigrations
No changes detected
```

`None`설정은 새로운 설정을 위해 테스트 settings.py 파일을 만들었을 때 관련 없는 앱의 migration을 막기 위해 사용될 수 있다고 한다.  


# Reference

* [Migrations](https://docs.djangoproject.com/en/2.1/topics/migrations/)
* [Squashing migrations](https://docs.djangoproject.com/en/2.1/topics/migrations/#migration-squashing) 