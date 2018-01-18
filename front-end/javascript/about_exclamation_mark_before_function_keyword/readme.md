# About exclamation mark before function keyword

문서를 작성하는 시점에 기억이 잘 나질 않는데, jQuery 관련 라이브러리를 분석하던 도중이었던것 같은데 다음과 같은 형식의 코드를 발견하였다.

```javascript
!function() {
    console.log('test');
}();
```

function keywork 앞에 !를 붙어있는 코드는 처음 보았다. 이것이 무엇인지 확인해보기로 했다. 

## Description

우선 위 코드를 달리쓰면 다음과 같다. 

```javascript
(function() {
    console.log('test');
})();
```

위와 같은 코드는 React.js, Vue.js등과 같은 Front-End Library 또는 Framework를 사용하지 않던 시절 개발 된 javascript library에서 많이 보던 코드이다. 
즉 해당 라이브러리가 로드 될 때 해당 함수를 바로 실행시켜 라이브러리를 초기화 시키기 위해 사용하던 기법이다.

function keyword 앞에 !를 붙여주면 바로 위 코드와 같이 동작한다. 

## Reference 

* [What does the exclamation mark do before the function?
](https://stackoverflow.com/questions/3755606/what-does-the-exclamation-mark-do-before-the-function)