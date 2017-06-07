# Hiding the scrollbar

HTML의 body의 contents가 많은 경우 scrollbar가 나타난다. 일반적인 경우 이러한 동작은 적절하지만, 몇몇 특수한 경우에는 scrollbar를 숨기는 것이 좀 더 적절한 경우가 있다.

예를들면, Modal Dialog를 출력하는 경우 Modal Dialog의 뒤 화면은 회색으로 overlay 되면서 제어를 할 수 없게 되어야하지만 라이브러리에 따라서는 scrollbar의 동작은 허용되는 경우가 있다. 이러한 경우 scrollbar를 숨겨주면 좀 더 Modal Dialog다운 동작을 제공할 수 있다.

scrollbar를 숨기는 방법은 아주 간단한데, body의 css 속성 중 overflow 속성에 hidden 값을 주면된다. overflow 속성에 hidden 값을 주면 화면 범위를 벗어나는 contents를 표시하지 않는 원리를 이용하는 것이다.

```html
body {
  overflow: hidden
}
```

## 참조

* [Hiding the scrollbar on an HTML page](https://stackoverflow.com/questions/3296644/hiding-the-scrollbar-on-an-html-page)
