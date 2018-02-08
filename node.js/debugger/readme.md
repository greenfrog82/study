# Debuggin Node.js

Python의 경우 pdb 모듈을 통해 별도 디버깅 툴 없이 command-line을 통해 코드를 디버깅할 수 있다.  
이번 글에서는 Python의 pdb 모듈과 같이 Node.js에서 command-line을 통해 코드를 디버깅할 수 있는 방법을 알아본다. 

우선 Node.js를 통해 디버깅을 하기 위한 예제코드는 다음과 같고, 파일 이름은 ex.js라고 하자.

```javascript
var sum = 0;

for(var i=0; i<10; i++) {
    sum += i;
}

console.log(sum);
```

## inspect argument

Node.js는 V8 Inspector를 통한 out-of-process 디버깅 유틸리티와 빌트 인 디버깅 클라이언트를 가지고있다.  
Node.js를 실행시킬 때 **inspect** argument를 통해서 원하는 코드를 디버깅 할 수 있다.  
**inspect** argument를 사용하는 방법은 다음과 같다. 

> $ node inspect \<javascript file path\>

예를들어, 다음 예제코드를 디버깅을 하기 위해서는 다음과 같이하면 된다.  

> $ node inspect ex.js

**inspect** argument를 사용해서 javascript 코드를 실행시키면 다음과 같이 debug client가 실행되어 debug prompt가 출력되는 것을 확인 할 수 있다.

```javascript
< Debugger listening on ws://127.0.0.1:9229/69aebdd0-e15f-42f2-9041-b5731841369f
< For help see https://nodejs.org/en/docs/inspector
< Debugger attached.
Break on start in ex.js:1
> 1 (function (exports, require, module, __filename, __dirname) {
  2 var sum = 0;
  3
debug>
```

## debugger statement

코드에 break point를 걸고자 할 때는 **debugger** statement를 사용하면 된다.  
앞선 예제코드의 7번쨰 라인인 console.log(sum); 코드에 break point를 걸로 싶으면 다음과 같이 하면된다. 

```javascript
debugger;
console.log(sum);
```

break point를 건 코드를 **inspect** argument를 통해 실행 한 후 debug prompt에 **c** 명령을 주면 break point를 걸었던 위치로 코드가 실행되는 것을 확인 할 수 있다. 

```javascript
< Debugger listening on ws://127.0.0.1:9229/aa2f1f7a-bc42-45ba-879c-34a6845bbbf9
< For help see https://nodejs.org/en/docs/inspector
< Debugger attached.
Break on start in ex.js:1
> 1 (function (exports, require, module, __filename, __dirname) {
  2 var sum = 0;
  3
debug> c
break in ex.js:8
  6 }
  7
> 8 debugger;
  9 console.log(sum);
 10 });
debug>
```

## Debug Commands

다음은 debug prompt에서 사용할 수 있는 명령들이다. 

### Stepping

* cont or c - continue execution
* next or n - step next
* step or s - step in
* out or o - step out

### Breakpoints

* setBreakpoint(), sb() - Set breakpoint on current line
* setBreakpoint(line), sb(line) - Set breakpoint on specific line
* setBreakpoint('fn()'), sb(...) - Set breakpoint on a first statement in functions body
* setBreakpoint('script.js', 1), sb(...) - Set breakpoint on first line of script.js
* clearBreakpoint('script.js', 1), cb(...) - Clear breakpoint in script.js on line 1

### Information

* list(5) - List scripts source code with 5 line context (5 lines before and after)
* exec expr - Execute an expression in debugging script's context

### Execution control

다음은 node.js debugger의 재미있는 기능인데, 현재 실행중인 코드를 처음부터 다시 디버깅 할 수 있다.  
다음 두 명령 모두 디버거를 다시 시작시키는것 같은데 아직 차이점은 잘 모르겠다. 추후 정리 필요.

* run - Run script (automatically runs on debugger's start)
* restart - Restart script

### Etc

* .exit - To exit debugger
* enter key - To repeat the previous debugger command



## Reference

* [Debugger](https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js)