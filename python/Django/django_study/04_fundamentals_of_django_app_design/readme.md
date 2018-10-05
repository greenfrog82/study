# 4. Fundamentals of DjangoApp Design

이번 장에서는 Django의 설계 근간에 대해서 살펴볼 것이다. 이에 앞서 다음 용어들이 무엇을 말하는지 분명히 해두자. 

* **Django Project**는 Django Web Framework를 통한 웹 어플리케이션이다.  
* **Django Apps**는 프로젝트의 특정 부분을 표한하도록 한 작은 라이브러리이다. Django Project는 여러개의 Django Apps으로 구성된다. 그들 중 일부는 Django Project에 속해있으므로 재사용 되지 않을 것이다. 재사용되는 Django Apps들은 Third-party Django Packages들이다.  
* **INSTALLED APPS**은 Django Project의 INSTALLED_APPS 설정에 설정 되어 사용되는 Django Apps 목록이다.  
* **Third-party Django Packages**는 Python의 패키징 툴을 통해 패키징 된 pluggable하고 reusable한 Django Apps이다. 

**CHECK**

**Third-Party Django Packages**가 Django Debug Tools 같은 것들인지?

## 4.1 The Golden Rule of Django App Design

Django core 개발자이자 배포 메니저인 James Bennett은 좋은 Django App 디자인은 다음과 같다고 이야기했다. 

>“Th􏰀e art of creating and maintaining a good Django app is that it should follow the truncated Unix philosophy according to Douglas McIlroy: ‘Write programs that do one thing and do it well.”’

본질적으로, **각각의 Django App들은 하나의 업무에만 집중되어야한다.** 만약 Django App을 간단한 한문장으로 설명할 수 없거나, '그리고'라는 표현을 사용하고 있다면 해당 Django App은 너무 크고 복잡한 것이다.

### 4.1.1 A Practical Example of Apps in a Project

**CHECK**

이번 절에서 소개하는 것과 같이 Django App을 개발하고 있는지 토론해 보자. 

나의 예를들면 xxxx의 경우 주문 및 배달 상태 정보를 주는데 xxxx 앱에서 이를 수행하지 않고 다른 앱에다 if문으로 관련 코드를 작성해둔것을 보았다. 
내 생각에는 xxxx에 주문 및 배달 상태 정보를 주는 코드를 짜고 url을 정의해두는 것이 맞다고 생각한다.  
이런 경우가 여기저기 있을 것 같은데 어떻게 생각하는지?

## 4.2 What to Name Your Django Apps

Django App Name을 지정할 때는 최대한 간단하게 작성해라. 다음은 Django App Name을 지정하는 몇가지 가이드이다.   

1. 일반적으로 Django App Name은 해당 Django App의 메인 모델의 복수형을 사용한다. 예를들어, fl􏰋avors, animals, polls, dreams, estimates, and fi􏰁nances.
2. 하지만 위와 같은 가이드를 따를 수 없는 경우도 존재한다. blog가 가장 대표적인 예이다. 이러한 경우 해당 Django App의 URL 어떻게 지정할지를 고민해서 고려해볼 수 있다. 만약 http://www.example.com/weblog/ 라는 이름으로 URL을 표현하고 싶다면 weblog가 다른 이름들보다 좋다.
3. PEP 8 Python Package Naming 룰을 사용하자. 짧고 숫자, '-', '.', 공백 또는 특수문자가 없는 소문자를 사용하자. 추천하지 않지만 가독성을 위해 '_'을 사용할 수 있다.  


## 4.3 When in Doubt, Keep Apps Small

앱 디자인에 대해서 책의 다음 표현이 너무 맘에 들었다. 개발을 할 때 늘 명심하면 좀 더 결정을 빨리할 수 있을 것 같다. 

>Don’t worry too hard about getting app design perfect. It’s an art, not a science. Sometimes you have to rewrite them or break them up. Th􏰀at’s okay.

앱은 항상 작게 쪼개도록 노력하자. 잘게 쪼개진 작은 앱들이 커다란 덩어리의 앱 보다 훨씬 좋다.  

## 4.4 What Modules Belong in an App?

Django App 내부에는 Django App에서 기본적으로 제공되는? Common App Modules과 Uncommon App Modules이 속한다.  

### 4.4.1 Common App Modules

**CHECK** 

다음은 Django 2.x에서는 앱 디렉토리 구조이다. 

```bash
.
├── __init__.py
├── admin.py
├── apps.py
├── migrations
│   └── __init__.py
├── models.py
├── tests.py
└── views.py
```

다음은 책에서 소개하는 앱 디렉토리 구조이다. 참고로 책은 Django 1.8 버전으로 내용을 소개하고 있다.

```bash
scoops/
    __init__.py
    admin.py
    forms.py
    management/
    migrations/
    models.py
    templatetags/
    tests/
    urls.py
    views.py
```

차이점을 보면 다음과 같다. 

* management/ 경로는 직접 생성하는 것으로 알고 있다. 
* forms.py 파일도 직접 생성하는 것으로 알고 있다. 
* templatetags/ 는 뭐지? templates는 알겠는데 그리고 이것도 직접 생성하는 것인가?
* tests/ 경로가 있는데 2.x에서는 tests.py 제공한다. 우리 레포를 보니 경로도 있고 tests.py있는데 이는 경우에 따라 쓰는건지, 그리고 python manage.py test에서 자동으로 인식하는건지?

### 4.4.2 Uncommon App Modules

시간이 흐르면서 생성 된 Django App이 기본적으로 생성해주는 Common App Modules 이외의 필요한 모듈들이 생겨났고 이들에 대한 네이밍 룰도 생겨났다.  

다음은 이러한 Uncommon App Modules의 목록이다.

```bash
scoops/
    behaviors.py
    constants.py
    context_processors.py
    decorators.py
    db/
    exceptions
    fields.py
    factories.py
    helpers.py
    managers.py
    middleware.py
    signals.py
    utils.py
    viewmixins.py
```

* **behaviors.py** 모델의 동작을 제어하기 위해 모델이 상속하기 위한 클래스들을 정의한다. 
* **constants.py** 앱 레벨의 설정내용을 정의한다.
* **decorators.py** 데코레이터를 정의한다. 
* **db/** 모델의 커스텀 필드나 􏰁콤포넌트등을 정의한다. ?? 이러면 behaviors.py도 여기에 있는데 더 나은것 같은데 .. 심지어 이건 디렉토리인데 ..
* **fields.py** Django From의 fields들을 정의한다. ?? 그리고 때때로 db/에 정의하기 모호한 것들을 여기에 정의한다는데 이게 무슨이야기이지?
* **factories.py** 테스트 데이터를 생성하는 코드들을 정의한다. 
* **helpers.py** or **utils.py** views나 models에서 분리해낸 statelss한 로직들을 정의한다. 
* **signals.py**  Django의 custom signal을 정의한다. 
* **viewmixins.py** views의 공통 기능과 속성들을 정의하기 위한 mixins을 정의한다.

## 4.5 Summary

이번 장에서는 Django App을 설계하는 방법에 대해서 알아보았다. Django App은 하나의 역할만을 가져야하면 충분히 간단해야하고 기억하기 쉬운 이름으로 명명되어야한다. 만약, Django App이 복잡하다면 작은 단위로 쪼개야한다. **Getting app design right takes practice and effort, but it’s well worth the effort.**