# package.json의 'scripts' 속성에서 NODE_ENV 환경 변수 설정이 안되는 문제

## 문제

Node.js 프로젝트를 진행할 때 ATOM을 사용하는데, ATOM의 Build 패키지를 통해 편리하게 코드를 실행하기 위해 다음과 같이 package.json의 'scripts'속성에 코드를 실행하기 위한 스크립트를 작성해 놓는다. <br />
이때, 일반적으로 개발 시 사용할 코드와 배포 시 사용할 코드를 나눠서 테스트하기 위해서(_데스크톱 개발이라면 Debug, Release와 같은 개념_) development와 production 스크립트를 작성해둔다. 다음과 같이 ..

```json
{
  "scripts":{
    "production": "cross-env NODE_ENV=production&&node ./dist/main.js",
    "development": "cross-env NODE_ENV=development&&node ./dist/main.js"
  }
}
```
평소에 위와 같이 스크립트를 작성해두고 잘 쓴것 같은데 'development'로 스크립트를 실행시켜도 다음코드에서 'production'을 반환해서 'development' 모드에서 동작시켜야하는 코드들이 동작하지 않는다.

```javascript
app.get('env');
```

원인을 알 수가 없어서 [cross-env](https://www.npmjs.com/package/cross-env)라이브러리 문제인가 해서 다음과 같이 해봐도 정상적으로 동작하지 않는다;;

```json
{
  "scripts":{
    "production": "SET NODE_ENV=production&&node ./dist/main.js",
    "development": "SET NODE_ENV=development&&node ./dist/main.js"
  }
}
```

## 원인

환경 설정을 잘 못하고 있나해서 [cross-env](https://www.npmjs.com/package/cross-env)의 사용법을 좀 보면되지 않을까 하고 [cross-env](https://www.npmjs.com/package/cross-env)의 웹 사이트에 가봤는데 아니나 다를까 스크립트를 잘못 작성해서 발생한 문제였다.

[Known limitations](https://www.npmjs.com/package/cross-env#known-limitations)라는 단락을 보면 문제의 원인이 나와있다. 내용은 다음과 같다.

>**Known limitations**
>
If you plan to do something like this:
>
cross-env FOO=bar && echo $FOO
>
And expect it to output bar you're going to be sad, for two reasons:
>
Technically, those will run as two separate commands, so even though FOO will properly be set to bar in the first command, the echo $FOO will not.
When echo $FOO runs, the $FOO variable is replaced with the variable value, before it's even passed to cross-env (though, as indicated in #1, that doesn't happen anyway)
The main use case for this package is to simply run another script which will (itself) respond to the environment variable. These limitations are not a problem in that scenario (like in the example).

## 해결

스크립트에서 환경 변수를 설정한 때는 &&으로 환경 변수를 사용하기 위한 명령을 구분하지 않고 이어서 코딩하면된다. 다음과 같이!

```json
{
  "scripts":{
    "production": "cross-env NODE_ENV=production node ./dist/main.js",
    "development": "cross-env NODE_ENV=development node ./dist/main.js"
  }
}
```
