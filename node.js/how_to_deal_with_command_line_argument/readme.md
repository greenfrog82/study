# How to deal with command line argument

Node.js에서 command line argument를 다루기 위해서는 process global 오브젝트의 argv 속성을 사용하면된다.  
argv 속성은 배열타입인데 첫번째 인덱스는 node명령이고, 두번째 인덱스는 node가 실행시키는 js파일이다. 세번째 인덱스부터가 command line argument이다.  

다음 예제코드에 command line argument를 전달해보자. 다음 예제 코드의 파일명은 main.js로 한다.  

```javascript
process.argv.forEach((value, idx) => {
    console.log(`[${idx}] : ${value}`);
});
```

위 코드를 다음과 같이 실행해보자. 

```sh
$ node main.js one two three
```

위 코드의 실행결과는 다음과 같다. 

```sh
[0] : /usr/local/Cellar/node/7.9.0/bin/node
[1] : /Users/greenfrog/develop/study/node.js/how_to_deal_with_command_line_argument/src/main.js
[2] : one
[3] : two
[4] : three
```

앞서 설명한대로 세번째 인덱스에서부터 command line argument가 전달되는 것을 확인 할 수 있다. 

## Reference

* [How do I pass command line arguments?
](https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments)