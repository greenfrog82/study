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



