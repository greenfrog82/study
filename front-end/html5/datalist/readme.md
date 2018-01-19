# datalist tag

HTML5 이전에 ListBox를 구현하기 위해서는 select태그와 option태그를 사용한다.  
하지만, 검색기능이 존재하지 않기 때문에 검색기능을 지원하지 위해서는 별도로 javascript library를 사용해야한다. 

HTML5에서는 검색기능이 존재하는 ListBox를 구현하기 위한 **datalist**태그를 제공하기 때문에 좀 더 편리해졌다. 

## How to use datalist tag

datalist 태그는 미리 정의 된 input 태그와 연동하여 검색 기능을 제공하는 ListBox를 생성한다.  
datalist 태그와 input 태그를 연동하기 위해서는 datalist의 id를 input 태그의 list속성의 값에 대입해주면 된다. 

```html
<input list="browsers" name="browser">
<datalist id="browsers">
    <option value="Internet Explorer">
    <option value="Firefox">
    <option value="Chrome">
    <option value="Opera">
    <option value="Safari">
</datalist>
```
 
## Consideration

아무래도 HTML5에 도입 된 기능이기 때문에 아직은 이 기능을 제공하는 Browser가 제한적이다.  
다음은 각 브라우저별 지원 버전을 정리한 내용이다. 

* Chrome 2.0 이상
* Internet Explorer 10 이상
* Firefox 4.0 이상
* Safari does not support
* Opera 9 이상

## Reference

* [HTML datalist Tag](https://www.w3schools.com/tags/tag_datalist.asp)