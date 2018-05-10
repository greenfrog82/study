# There is no X-Requested-With HTTP Header with axios

서버에서 클라이언트의 요청이 XHR인지 확인하여 이에 따라 동작을 처리하도록 해두었는데, **vue.js**로 개발한 코드에서 **axios**로 GET, POST 등의 요청을 보냈을 때 **X-Reqested-With** Header가 누락되는 현상이 발견되었다.  
일반적으로 jQuery를 사용할 때는 기본으로 **X-Request-With**가 기본으로 붙기 때문에 이러한 동작이 뭔가 부자연스럽니다.  

## How to resolve this problem

문서를 찾아보니 Axios의 issue에 다음과 같이 기본 설정을 해달라는 요청이 있었고, 기본 설정해서 쓰라는 답변이 있었다.  

>[please add headers["X-Requested-With"] = "XMLHttpRequest" as default value #1322](https://github.com/axios/axios/issues/1322)

따라서 전역 설정을 위해 vue.js의 main.js에서 axios를 import 한 후 **X-Requested-With** Header를 설정해 주었다. 

```javascript
// main.js
import axios from 'axios'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
```

## Reference

* [Global axios defaults](https://github.com/axios/axios#global-axios-defaults)
* [please add headers["X-Requested-With"] = "XMLHttpRequest" as default value #1322](https://github.com/axios/axios/issues/1322)