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

Django의 models.Model만을 상속해서 모델을 생성하는 방법

**Pros**

Django의 모델이 DB Table과 어떻게 맵핑되는지 이해하기 쉽다. 

**Cons**

여러개의 모델이 공통으로 사용하는 필드가 존재할 때 관리가 힘들어진다.  

#### Abstract base classes

공통된 필드와 동작을 상속하기 위한 클래스로 상속하지 않고 인스턴스를 생성할 수 없다.  

**Pros**

공통된 필드를 필요로 하는 모델이 있다면 이를 재사용할 수 있다.   
?? 다중상속으로 인해 발생하는 추가적인 테이블과 조인의 오버헤드가 발생하지 않는다.

**Cons**

부모 클래스는 단독으로 사용할 수 없다.

#### Multi-table inheritance

??

#### Proxy models

??

다음은 언제 어떤 타입의 상속을 사용해야하는가에 대한 간단한 규칙이다.

* 여러분이 오직 몇 개의 모델들을 가지고 있고 하나 또는 두개의 분명한 필드들이 중복된다면, 굳이 상속이 필요없다. 그저 필요한 필드를 몇 개의 모델에 추가해주면 된다. 
* 모델간에 반복되는 모델의 유지보수가 혼란이나 의도하지 않는 실수를 야기한다면, 대부분의 경우 **abstract base model**로 공통 필드를 옮겨야한다.  
* Proxy model ... ??
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

**TimeStampModel**을 상속받아서 새로운 클래스를 만든 경우, `migrate`를 수행헀을 때 **core_timestampedmodel** 테이블을 생성하지 않는다.   

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

반면에, TimeStampedModel을 **abstract class**로 만들지 않고 **concreate base class**로 생성한 후 위와 같이 상속한다면 **my_app_timestampedmodel** 테이블이 생성된다. 뿐만 아니라 TimeStampedModel을 하위 클래스들은 TimeStampedModel의 필드를 갖지 않고 ForeignKey 제약 조건이 걸려있는 것을 알 수 있다. 

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

