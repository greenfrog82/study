# Markdown Tutorial

Markdown이라는 언어가 Github에서만 사용하는 언어인 줄 알았는데, Wikipedia에서 Markdown에 대한 내용을 보니, John Gruber라는 사람이 Aaron Swartz라는 사람과 함께 읽고 쓰기 쉬운 plain text형식으로 rich text를 만들어 내기 위해서 만든 언어라고 한다.
자세한 내용은 https://en.wikipedia.org/wiki/Markdown를 참조하도록 하고 ..

앞으로 열심히 오픈소스 커뮤니티에서 그 동안 받은 은혜를 갚기 위해서 활동하기로 했으므로 우선, Github에서 문서를 쓸 때 사용할 목적으로 Markdown을 공부하기로 했다.

http://www.markdowntutorial.com/ 사이트를 이용하면 Markdown을 쉽게 배울 수 있는데, 하나하나 따라해보면서 사용법을 간단히 정리하였다.

### Italics
***

이탤릭체를 표현하기 위해서는 이탤릭체를 사용하고자 하는 단어 또는 문장을 밑줄( \_ )으로 감싸주면 된다.

> \_안녕하세요.\_ <br />
 _안녕하세요._

### Bold
***

볼트체를 표현하기 위해서는 볼드체를 사용하고자 하는 단어 또는 문장을 ( \*\* )으로 감싸주면 된다.

> \*\*안녕하세요.\*\*  <br />
**안녕하세요.**

### Italics and Bold
***

이택릭체와 볼트체를 혼합해서 사용하고자 한다면, ( \*\*\_Italics and Bold\_\*\* ) 으로 감싸주면 된다.

>\*\*\_안녕하세요.\_\*\*  <br />
**_안녕하세요_.**

### Headers
***

HTML에서와 같이 Header를 표현하고자 하면 간단히 #(# 문장)을 문장의 앞에 붙여주면 된다. 이때 #의 개수가 Header의 크기를 결정하는데 1이 가장 크고 6이 가장 작다.

참고로 Github에 아래 예제를 올려서 보면 #과 ##은 적용한 문장 아래에 실선이 쳐진다. 공부했던 Tutorial과는 달리 ..

>\# 안녕하세요.
# 안녕하세요.
\## 안녕하세요.
## 안녕하세요.
\### 안녕하세요.
### 안녕하세요.
\#### 안녕하세요.
#### 안녕하세요.
\##### 안녕하세요.
##### 안녕하세요.
\###### 안녕하세요.
###### 안녕하세요.

### Links

Makrdown에서는 링크를 거는 방법이 두 가지 있는데, 둘다 결과는 같다. 첫번째 방법은 _inlin link_라고 불리는데, 링크 텍스트를 대괄호( [] )로 묶어고, 링크를 소괄호( () )로 묶어주면 된다.

>\[Visit Github!\](www.github.com) <br />
[Visit Github!](www.github.com)

링크 텍스트를 강조할 수 있다. 강조할 때는 볼드체 형식을 사용하면 된다.

>\[Visit \*\*Github!\*\*\](www.github.com) <br />
[Visit **Github!**](www.github.com)

Header로 지정한 문장의 중간에 링크를 넣을 수도 있다.

>The Latest news from \[the BBC\]\(www.bbc.com/news\)<br />
The Latest news from [the BBC](www.bbc.com/news)

링크를 거는 두번째 방법은 _reference link_라고 불린다. HTML에서 링크를 #으로 거는것과 같다. 다시말하면, 페이지 외부의 링크를 거는 것이 아니라 페이지 내에서 참조하고자 하는 위치를 링크하는 것이다.




**_정리 중 ..._**
