# 7. Queries and the Database Layer

다른 ORM툴과 같이, Django는 다른 타입의 데이터를 데이터베이스에서 지원되는 오브젝트로 변경한다. 그래서 Django의 ORM은 이러한 오브젝트와 상호작용하기 위한 몇가지 방법을 제공한다.  
대부분의 경우, Django의 ORM은 디자인된대로 아주 잘 동작한다. 그러나 Django의 ORM은 변덕스러운 동작도 한다. 이번장에서는 이러한 부분들을 이해하고 어떻게 Django를 사용하 수 있는지 알아보도록 하자.   

## 7.1 Use get_object_or_404() for Single Objects

상세화면과 같은 view에서 모델의 하나의 오브젝트만 반환하고 싶다면, `get()`을 보다는 `get_object_or_404()`를 사용하자.  

다음은 `get_object_or_404()`을 사용할 때 주의할 점이다.  

* 반드시 `view`에서면 사용하자.
* helper 함수들, forms, model의 메소드들이나 view 또는 view와 직접적으로 관련있는 모든 곳에서 사용하지 말자.  

앞서 `get_object_or_404()`를 사용할 때 주의사항으로 반드시 `view`에서만 사용하자고 했다. 이런 이유는 `get_object_or_404()`의 경우 가져오고자 했던 오브젝트가 존재하지 않는 경우 `Http404`예외를 발생시키고 이를 Django가 받아서 정의된 404 에러 페이지를 전달한다.   
물론, 다음 테스트 코드와 같이 `django.http.Http404`예외를 직접 `try-except`로 받아서 처리할수는 있지만, `get_object_or_404()`의 목적은 찾고자하는 데이터를 찾지 못한 경우 `django.http.Http404`예외를 발생시키고 Djagno가 이를 처리하도록하는 것이기 때문에 이러한 용도로 `view`가 아닌 **helper, forms, model 등**에서 이를 사용했다면, 코드가 진행되어야함에도 불구하고 예외 페이지(Page Not Found)가 출력되어버리는 문제가 발생할 것이다. 따라서 이러한 경우는 `get()`을 사용해야한다. 

```python
class TestShortcusts(TestCase):
    def test_get_object_or_404(self):
        with self.assertRaises(Http404):
            get_object_or_404(Article, pk=1)

    def test_catch_http404_when_get_object_or_404_raise_http404_exception(self):
        try:
            get_object_or_404(Article, pk=1)
        except Http404:
            self.assertTrue(True)
        else:
            self.assertTrue(False)
```

## 7.2 Be Careful With Queries That Might Throw Exceptions

앞서 소개했던 `get_object_or_404()`의 경우, 개발자가 `try-except`를 통해 예외를 처리해줄 필요가 없다. Django가 이미 `get_object_or_404()`가 내는 예외를 잡아서 적절히 처리해주기 때문이다.  
하지만, 대부분의 경우 `try-except`를 통해 예외를 처리해주어야한다. 

### 7.2.1 ObjectDoesNotExist vs DoesNotExist

`ObjectDoesNotExist`와 `DoesNotExist`는 둘 다 QuerySet의 `get()`을 사용할 때, 찾고자 하는 데이터가 없을 경우 발생된다. 이 둘의 차이는 `ObjectDoesNotExist`는 어떤 모델에 대해서든 사용할 수 있다는 것이고 `DoesNotExist`는 특정 모델에 대해서만 사용할 수 있다는 것이다.  



