# Path Variable vs Query String

우선, 다음 코드를 보자.  
특정 사용자의 정보를 조회하고자하는 url이 있고, 해당 url은 Query String을 통해 조회하고자하는 사용자의 id를 전달받아 조회한 내용을 클라이언트로 전달한다. 

```python
# urls.py
url(r'^user_manager/user_info/$', user_manager.UserManager.as_view(), name='user_info')
```
```python
# view.py
class UserManager(GenericAPIView):
    def get(self, request, *args, **kwargs):
        try:
            user_info = UserManager.objects.get(pk=request.QUERY_PARAMS.get('user_id'))
            return Response({ 'user_id': user_info.id, 'user_name': user_info.name }, status=status.HTTP_200_OK)
        except UserManager.DoesNotExist:
            return Response({}, status=status.HTTP_200_OK)
        except APIException, e:
            return Response({'detail': e.detail}, status=e.status_code)
        except Exception, e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
```

위 코드의 경우 [RetrieveAPIView](http://www.django-rest-framework.org/api-guide/generic-views/#retrieveapiview)을 통하면 코드를 간소화 할 수 있기 때문에 이를 통해 수정을 시도하였다.  
다음 코드를 보자. 코드가 훨씬 간단해졌다. 

```python
# view.py
class UserManager(RetrieveAPIView):
    queryset = UserManager.objects.all()
    lookup_url_kwarg = 'user_id'
    serializer_class = UserSerializer
    def get(self, reqeust, *args, **kwargs):
        return super(UserManager, self).retrieve(request, *args, **kwargs)
```

이 코드를 실행시키면 **404 Not Found** 에러가 발생한다.

이러한 결과가 나타나는 이유는 GenericAPIView의 [get_object](http://www.django-rest-framework.org/api-guide/generic-views/#get_objectself)함수에서 request.GET(Query Parameter)를 사용하지 않고, kwargs로 넘어 온 Path Variable을 사용하기 때문이다. 

따라서, 위 코드가 동작하려면 urls.py를 수정하여 기존에 **Query Parameter**로 전달되던 **user_id**가 **Path Variable**로 전달되도록 해야한다.  

```python
# urls.py
url(r'^user_manager/user_info/(?P<user_id>\d+)/$', user_manager.UserManager.as_view(), name='user_info')
```

위와 같이 urls.py까지 수정이 끝나면 위 코드가 정상적으로 동작한다.  

그런데 한가지 의문이 든다. 앞서와 같이 **RetrieveAPIView**를 사용하는 경우 GET 메소드를 통해 특정 데이터를 가져오는 경우 **Query Parameter**를 사용하지 못하고 오직 **Path Variable**을 사용해야한다. 
그렇다면 언제 **Query Parameter**는 언제 사용해야하며, **Path Variable**은 언제 사용해야하는걸까? 

## Path Variable

우선 **RetrieveAPIView**에서 **Query Parameter**를 사용하지 않고 **Path Variable**을 통해 특정 데이터를 가져오도록 구현되어 있는 이유가 있다. 
Restful API를 만들때 특정 데이터를 가져오기 위해서는 **Query Parameter**를 사용하지 않고 **Path Variable**을 사용한다. 
각각 용도가 다르기 때문인데, **Query Parameter**에 대해서는 뒤에 알아보도록 하고 **Path Variable**의 용도는 다음과 같다.  

* 특정 데이터를 가져오기 위한 경우
* 계층 구조로 되어 있는 데이터를 가져오기 위한 경우 

두 가지 경우로 나눠 놨지만 결국 특정 데이터를 가져오고자 하는 경우 **Path Variable**을 사용한다. 

### 특정 데이터를 가져오기 위한 경우 

UserManager의 경우와 같이 특정 데이터를 가져오기 위한 경우이다. 

### 계층 구조로 되어 있는 데이터를 가져오기 위한 경우

예를들어, 다음과 같은 URL을 처리해야하는 경우이다. 
다음 URL의 경우 특정 사용자의 하위 정보들 중 주소에 대한 정보를 가져온다.  

```python
# urls.py
url(r'^user_manager/user_info/(?P<user_id>\d+)/address/$', user_manager.UserManager.as_view(), name='user_info')
```

사실 위와 같은 경우 **Query Parameter**를 통해서도 할 수 있지만 **Path Variable**을 사용하면 다음과 같은 장점이 있다. 

1. url에 대한 가독성이 높아진다.
    url을 통해서 어떤 파라메터를 넘겨줘야하는지 알 수 있다. 만약 **Query Parameter**를 사용했다면 View의 코드를 살펴야한다.
2. 파라메터가 누락되지 않는다. 
    **Query Parameter**를 사용하면 파라메터가 누락되더라도 일단 View로 요청이 전달되지만, **Path Variable**을 사용하는 경우 파라메터가 누락되면 **404 NOT Found** 에러가 발생한다. 
3. 파라메터의 타입 검증이 된다.
    **Query Parameter**의 경우 파라메터의 타입 검증을 View에서 직접해줘야하지만, **Path Variable**을 사용하는 경우 파라메터의 타입 검사가 되고 위배 되는 경우 **404 NOT Found** 에러가 발생한다. 

## Query String

**Query String**의 경우 **Path Variable**의 보조적인 기능으로 사용되는데, **Path Variable**로 찾은 데이터들을 **페이징, 필터링, 검색**을 할 때 사용한다.

DRF에서 [Filtering](http://www.django-rest-framework.org/api-guide/filtering/)의 경우 **Query Parameter**로 넘어 온 데이터를 사용하여 필터링을 하며, 페이징의 경우 역시 **Query Parameter**로 전달 된 데이터를 사용한다. 


## Reference

* [When Should You Use Path Variable and Query Parameter?](https://medium.com/@moschan/when-should-you-use-path-variable-and-query-parameter-a346790e8a6d)
* [RESTful API Designing guidelines — The best practices](https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9)