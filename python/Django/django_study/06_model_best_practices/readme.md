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

#### Multi-table inheritance or Concrete inheritance

다음과 같이 Concreate Class를 상속하는 것으로, 묵시적인 부모와 자식간의 ForigenKey 관계를 포현한다.

```python
class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


class Flavor(TimeStampedModel):
    title = models.CharField(max_length=200)
```

**Pros**

* `Abstract base classes`와 달리 각 모델이 별도의 테이블을 갖는다.
* 따라서, 부모 모델 또는 자식 모델을 별도로 조회할 수 있다. 
* 부모 모델로부터 자식모델을 다음과 같은 형태로 조회할 수 있다.  
    **parent.child**

**Cons**

* 자식 테이블을 조회할 때 모든 부모 테이블에 대한 `join`이 필요해 많은 오버헤드가 발생한다. 
* 따라서, 이 방법은 가급적 사용하지 않기를 권장한다.

#### Proxy models

하나의 테이블에 대해서 여러개의 모델을 정의할 수 있다.  

**Pros**

* 하나의 테이블에 대해서 여러개의 행위를 정의할 수 있다. 

**Cons**

* 모델의 필드를 변경할 수 없다.  

**TODO**

* Multi-table inheritance의 실제 예제 작성
* Proxy Model의 실제 예제 작성

다음은 언제 어떤 타입의 상속을 사용해야하는가에 대한 간단한 규칙이다.

* 여러분이 오직 몇 개의 모델들을 가지고 있고 하나 또는 두개의 분명한 필드들이 중복된다면, 굳이 상속이 필요없다. 그저 필요한 필드를 몇 개의 모델에 추가해주면 된다. 
* 모델간에 반복되는 모델의 유지보수가 혼란이나 의도하지 않는 실수를 야기한다면, 대부분의 경우 **abstract base model**로 공통 필드를 옮겨야한다.  
* Proxy modeld은 때때로 유용하고 편리한 기능이지만 상속 스타일과는 아주 다르다.
* 혼란과 상당한 오버헤드를 발생시키기 때문에, 반드시 **multi-table inheritance**는 피해야한다. 차라리 명시적인 `OneToOneFields`나 `ForeignKeys`를 사용해라. 

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
* migration code가 관리하기 어려울만큼 늘어난다면 `squashmigrations`명령을 통해 해결할 수 있다.

마이그레이션을 개발하고 관리해라!

* 해당 프로젝트를 배포하기 전에 적용된 마이그레이션이 롤백될 수 있는지 확인해라. 언제나 완벽하게 이러한 체크를 수행할 수 없겠지만, 이를 수행하지 않으면 큰 프로젝트이 경우 버그를 추적하고 배포하는것에 어려움을 느낄 것이다. 
    * ?? 버그 추적이 어렵다는게 어떤 의미일까
    * ?? 배포하는것의 어려움을 해결할 수 있다는 것이 롤백이 되기 때문일텐데, 실제로 이러한 경험이 있는지 이야기해보자.
* 수백만개의 행을 갖는 테이블이 있는 경우 스테이징 서버에서 해당 데이터 사이즈에 대한 광범위한 테스트를 진행해라. 실제 서버에서는 더 많이 시간이 필요할 수 있다.  
    * ?? 요즘같이 무정지 배포를 하는 경우 시간적인 문제가 이슈가 될 수 있을까? 오히려 테이블이 깨지지 않는지 이런부분이 더 이슈가 될 것 같은데? 이런걸 테스트한다는게 더 이유가 되지 않을지?
* 만약 MySQL을 사용한다면, 
    * 스키마의 변경이 있을 때 반드시 백업을 수행해라. MySQL은 스키마변경에 대한 트랜잭션이 부족하므로 롤백이 불가능하다. 
    * 스키마 변경을 수행하기 전에 할 수 있다면 프로젝트를 read-only 모드로 해두어라.
        * ?? 이게 무슨 소리지?
    * 주의하지 않으면 많은 양의 데이터를 가지고 있는 테이블의 스키마 변경에 많은 시간이 필요할 수 있다. 
        * ?? 그럼 어떻게 주의를 하란 말이지? 

# 6.2 Django Model Design

### Migration Commands 

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

Django는 일반적으로 100개정도의 마이그레이션은 성능이슈없이 처리하지만, 그 이상은 그렇지 않다. 그리고 마이그레이션 파일들이 많으면 이를 정리할 필요를 느낄 것이다. 이를 수행하는 것이 `squshmigrations` command이다. 

>django-admin squashmigrations app_label [start_migration_name] migration_name

**Parameter(s)**

* app_label : squashmigrations을 하고자하는 앱 이름
* start_migration_name (Option) : squashmigrations을 하고자하는 시작 migration 이름. 
* migration_name : squashmigrations을 하고자하는 migration 이름으로, `start_migration_name` 옵션이 이 있는경우 해당 migration부터 이 옵션까지, 없는 경우 처음부터 이 옵션까지 squshmigrations을 수행한다. 

**Example**

다음과 같이 my_app에 마이그레이션 목록이 존재한다. 이를 처음부터 0004번 아미그레이션까지 `squashmigrations`해보자.  

```bash
$ python3 ./manage.py showmigrations my_app
my_app
 [X] 0001_initial
 [X] 0002_article
 [X] 0003_author
 [X] 0004_article_author
```

다음은 `squashmigrations`명령을 수행한 내용이다.  

```bash
$ python3 ./manage.py squashmigrations my_app 0004
Will squash the following migrations:
 - 0001_initial
 - 0002_article
 - 0003_author
 - 0004_article_author
Do you wish to proceed? [yN] y
Optimizing...
  No optimizations possible.
Created new squashed migration /develop/python/Django/django_study/mysite/my_app/migrations/0001_squashed_0004_article_author.py
  You should commit this migration but leave the old ones in place;
  the new migration will be used for new installs. Once you are sure
  all instances of the codebase have applied the migrations you squashed,
  you can delete them.
```

이제 `squashmigrations`이후 마이그레이션 항목을 확인해보자. 마이그레이션이 하나로 정리된 것을 확인할 수 있다.  

```bash
python3 ./manage.py showmigrations my_app
my_app
 [X] 0001_squashed_0004_article_author (4 squashed migrations)
```

이제 해당 `showmigrations`을 통해 `squashmigrations`된 마이그레이션을 확인해보면, 앞선 마이그레이션들이 하나의 파일로 정리된 것을 볼 수 있다. 만약 최적화가 되었다면 일부 쿼리가 제외되었겠지만, 지금은 최적화될 내용이 존재하지 않기 때문에 앞선 마이그레이션 쿼리가 그대로 존재하는것을 확인 할 수 있다.   

```bash
python3 ./manage.py sqlmigrate my_app 0001_squashed_0004_article_author
BEGIN;
--
-- Create model TimeStampedModel
--
CREATE TABLE "my_app_timestampedmodel" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "created" datetime NOT NULL, "modified" datetime NOT NULL);
--
-- Create model Flavor
--
CREATE TABLE "my_app_flavor" ("timestampedmodel_ptr_id" integer NOT NULL PRIMARY KEY REFERENCES "my_app_timestampedmodel" ("id") DEFERRABLE INITIALLY DEFERRED, "title" varchar(200) NOT NULL);
--
-- Create model Article
--
CREATE TABLE "my_app_article" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "content" varchar(200) NOT NULL);
--
-- Create model Author
--
CREATE TABLE "my_app_author" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(120) NOT NULL);
--
-- Add field author to article
--
ALTER TABLE "my_app_article" RENAME TO "my_app_article__old";
CREATE TABLE "my_app_article" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "content" varchar(200) NOT NULL, "author_id" integer NOT NULL REFERENCES "my_app_author" ("id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO "my_app_article" ("content", "author_id", "id") SELECT "content", 1, "id" FROM "my_app_article__old";
DROP TABLE "my_app_article__old";
CREATE INDEX "my_app_article_author_id_19c2ced7" ON "my_app_article" ("author_id");
COMMIT;
```

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

## 6.2 Django Model Design

최소한의 관심을 받는 가장 어려운 주제들 중 하나는 모델 디자인에 관한 것이다.
어떻게 이른 최적화 없이 성능 좋은 디자인을 할 수 있을까? 여기서 이에 대한 전략에 대해 알아보자.  
### 6.2.1 Start Normalized

[About Database Normalization](https://github.com/greenfrog82/study/tree/master/db/common/normalization)

Django의 모델을 디자인한다면, 항상 `Normalization`부터 시작하자. 시간을 갖고 다른 모델이 이미 저장하고 있는 데이터가 없는지 확인하자.   

이러한 전약에서는 `relationship field(ForeignKey, OneToOne, ManyToMany)`들을 충분히 사용하고 이르게 `Denormalization`은 하지말자.

### 6.2.2 Cache Before Denormalizing

종종, 캐쉬를 적절하게 사용하는 것은 모델을 `Denormalization`하여 발생하는 문제를 해결할 수 있다. 이후 chapter 24, Finding and Reducing Bottlenecks에서 이 부분에 대해서 다룬다.   

### 6.2.3 Denormalize Only if Absolutely Needed

`Normalization`을 잘 모르는 경우 `Denormalization`의 유혹에 넘어갈 수 있다. 하지만 그러지 마라! `Denormalization`이 프로젝트에서 발생하는 문제들을 모두 해결해 줄 것 같이 보일수 있다. 사실은 그렇지 않다. 오히려 프로젝트의 복잡도를 높이고 데이터 유실률을 극적으로 증가시킨다.   

따라서, `Denormalization`을 진행하기 전에 반드시 `Cache`를 먼저 고려하여라!

**CHECK**

Denormalization을 해야만 했던 경우와 왜 그랬는지 그리고 Cache를 적용해서 해결하는 방벙에 대해서 알고 있는 분 있으면 먼저 이야기해보자.

### 6.2.4 When to Use Null and Blank

모델의 field를 정의할 때 `null=True`와 `blank=True`옵션을 정의할 수 있다. 이 두 옵션의 기본값은 **False**이다.  

이 두 옵션을 언제 사용해야하는가는 모든 개발자가 겪는 혼란이다.   

여기서 위 두 옵션을 언제 사용해야하는지에 대한 가이드를 알아보자.  

#### CharField, TextField, SlugField, EmailField, CommaSeparatedIntegerField(deprecated on 2.1), UUIDField

* null=True
    Don't do this.  
    이 필드들에 값을 입력하지 않으면 장고는 언제나 **None** 또는 **빈 문자열**을 반환한다.
* blank=True
    Okay.  
    widget이 빈값을 허용하게 하려면 이 옵션을 사용하자. 이 옵션을 사용하면 사용자가 값을 입력하지 않으면 DB에 빈 문자열이 입력된다.

#### FileField, ImageField

* null=True
    Don't do this.   
    MEDIA_ROOT 경로로부터 저장되는 파일 또는 이미지들의 경로는 `CharField`로 저장한다. 따라서 앞서 설명한것과 동일한 이유로 해당 옵션은 사용하지말자.  
* blank=True
    앞서 설명한것과 동일한 이유로 해당 옵션의 사용은 허용된다.   

#### BooleanField

* null=True
    Don't do this. `NullBooleanField`를 대신 사용하자.
* blank=True
    Don't do this.  
    ?? 왜 이유가 없지 ... null=True와 같은건가?

#### IntegerField, FloatField, DecimalField, DurationField, etc

* null=True
    Okay.  
    만약 DB에 **NULL**값을 저장하고자 한다면, 사용하자.
* blank=True
    Okay.  
    만약 widget에서 빈값을 입력받고자 한다면, 사용하자. 

#### DateTimeField, DateField, TimeField, etc

* null=True
    Okay.
    만약 DB에 **NULL**값을 저장하고자 한다면, 사용하자.
* blank=True
    Okay.  
    widget(e.g. select box)에서 빈값을 받고자 한다면, 사용하자. 

#### GenericIPAddressField

* null=True
    Okay.  
    만약 DB에 **NULL**값을 저장하고자 한다면, 사용하자.
* blank=True
    만약 widget에서 빈값을 입력받고자 한다면, 사용하자. 

### 6.2.5 When to Use BinaryField

bytes, bytearray 또는 memoryview를 저장할 수 있다.   
일반적인 field들과 달리 filter, exclude와 같은 쿼리를 사용할 수 없다.   
해당 필드는 다음과 같은 경우 사용할 수 있다. 

* MessagePack-formatted content.
* Raw sensor data.
* Compressed data.

해당 필드의 활용도는 무한하지만, 반드시 기억해야할 것은 바이너리 데이터가 엄청 커질 수 있어 DB가 느려질 수 있다는것이다. 이런 경우 바이너리 데이터는 파일 형태로 저장하고 `FileField`가 이 경로를 저장하고 있도록하자.   

**CHECK**

확인 결과 우리는 아예 해당 필드를 사용하지 않는다. 그럼 우리의 파일관리는 전부 파일시스템에?

#### WARNING: Don't Serve Files From BinaryField!

http://2scoops.co/three-things-not-to-put-in-database에 따르면 다음 세가지 성격의 파일은 DB에 저장하지 말라고 나온다.  

* Images, files, and binary data
    * read/write를 DB에 하는것은 언제난 파일 시스템보다 느리다.
    * DB를 backup하는 경우 데이터가 점점 커져서 시간이 오래걸리게 된다. 
    * 이러한 데이터에 저장하기 위해서는 어플리케이션과 DB Layer를 거쳐야만한다. 
* Ephemeral data
    수명이 짧은 데이터들의 경우 redis와 같은 캐쉬를 사용해라. 
* Log
    Log를 DB에 쌓는것이 무조건 나쁘다는것은 아니다. Log를 쌓는 장소 Production의 데이터가 저장된 같은 DB일 경우 문제가 된다.  
    차라리 Splunk? 이런 툴이나 전통적인 로깅 방식을 사용해라. 

# Reference

* [Migrations](https://docs.djangoproject.com/en/2.1/topics/migrations/)
* [Squashing migrations](https://docs.djangoproject.com/en/2.1/topics/migrations/#migration-squashing) 