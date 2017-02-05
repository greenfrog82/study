# render 함수와 render_to_response 함수의 차이점

## 개요

[장고 걸스 튜토리얼 (Django Girls Tutorial)](https://tutorial.djangogirls.org/ko/)을 하면서 특정 view에 대한 요청에 대해서 응답을 할 때는 다음과 같이 [render](https://docs.djangoproject.com/en/1.8/topics/http/shortcuts/#render)함수를 사용하였다. 

```python
def post_detail(request, pk):
    post = Post.bojects.get(pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})
```

하지만, Django version 1.3버전으로 작성 된 코드를 보다가 응답을 [render_to_response](https://docs.djangoproject.com/en/1.8/topics/http/shortcuts/#render-to-response)로 하는 코드를 보게되었다. 
따라서, [render](https://docs.djangoproject.com/en/1.8/topics/http/shortcuts/#render)와 [render_to_response](https://docs.djangoproject.com/en/1.8/topics/http/shortcuts/#render-to-response)가 뭐가 다른지 궁금해졌다.
이에 대해서 알아보자.

## 설명

[render](https://docs.djangoproject.com/en/1.8/topics/http/shortcuts/#render)로 구현된 응답 코드를 [render_to_response](https://docs.djangoproject.com/en/1.8/topics/http/shortcuts/#render-to-response)을 이용해서 수정해보면 다음과 같다.

```python
def post_detail(request, pk):
    post = Post.objects.get(pk=pk)
    return render_to_response('blog/post_detail.html', {'post':post})
```

언뜻 보면, [render](https://docs.djangoproject.com/en/1.8/topics/http/shortcuts/#render)함수보다 하나의 인자를 덜 넘기니까 간단해 보인다. 
하지만, 이 방법은 템플릿에서 {'post':post}로 전달한 파라메터에는 접근할 수 있지만 HttpRequest를 통해 접근해야하는 중요한 정보들에는 접근할 수 없다.
따라서, 이러한 정보에 접근하게 하려면 다음과 같이 content_instance 파라메터를 넘겨주어야한다. 

```python
def post_detail(request, pk):
    post = Post.objects.get(pk=pk)
    return render_to_response('blog/post_detail.html', {'post':post}, context_instance=RequestContext(request))
```

하지만, [render](https://docs.djangoproject.com/en/1.8/topics/http/shortcuts/#render)함수는 첫번째 인자로 HttpRequest 객체를 전달받는데 이 간단한 방법으로 [render_to_response](https://docs.djangoproject.com/en/1.8/topics/http/shortcuts/#render-to-response)의 conext_instance
를 대신한다. 따라서 응답을 처리하는 훨씬 간단한 방법이다. 


## 결론


Django의 [render](https://docs.djangoproject.com/en/1.8/topics/http/shortcuts/#render)에 대한 레퍼런스를 보면 다음과 같은 내용이 있다. 

```
render() is the same as a call to render_to_response() with a context_instance argument that forces the use of a RequestContext.
```

결국, [render_to_response](https://docs.djangoproject.com/en/1.8/topics/http/shortcuts/#render-to-response)을 사용하기 보다는 [render](https://docs.djangoproject.com/en/1.8/topics/http/shortcuts/#render)를 사용하는 것이 좀 더 간결하다고 생각된다.


## 참고

* [Django - what is the difference between render(), render_to_response() and direct_to_template()?](http://stackoverflow.com/questions/5154358/django-what-is-the-difference-between-render-render-to-response-and-direc)
* [Django "render" vs "render_to_response"](https://rayed.com/wordpress/?p=1445)