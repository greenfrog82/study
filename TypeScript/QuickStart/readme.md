_본 문서는 [TypeScript 공식 사이트](https://www.typescriptlang.org/docs/tutorial.html)의 [Quick start](https://www.typescriptlang.org/docs/tutorial.html)_

# Quick Start

TypeScript를 가지고 간단한 웹 어플리케이션을 빌드하는 것을 시작해보자.

### TypeScript 설치하기

TypeScript를 개발하기 위한 도구들을 구하는 일반적인 방법은 다음 두가지이다.

* npm 패키지(Node.js의 패키지 메니저)
* TypeScript의 Visual Studio plugin 설치

> **역자주**
> 만약, ATOM Editor를 사용한다면 위 방법이 아닌 [atom-typescript](https://atom.io/packages/atom-typescript)패키지를 설치하면 된다.

NPM 사용자는 다음과 같이 하면 된다.

```
npm install -g typescript
```

### 첫 TypeScript 파일 만들기

여러분의 에디터에서 <font style='color:#C7524F'>greeter.ts</font>파일 안에 다음 자바스크립트 코드를 작성해라.

```javascript
function greeter(person) {
  return 'Hellow, ' + person;
}

var user = "Jane User";

document.body.innerHTML = greeter(user);
```

### 컴파일하기

앞선 코드를 작성할 때, <font style='color:#C7524F'>.ts</font> 확장자를 사용하였다. 그러나, 작성 된 코드는 단지 자바스크립트이다. 이 코드들은 외부에 존재하는 자바스크립트 어플리케이션에 그대로 복사해서 붙여넣을 수 있다.

명령 프롬프트에서 TypeScript 컴파일러를 실행해라.

```
tsc greeter.ts
```

> **역자주**
> 만약, ATOM Editor에서 [atom-typescript](https://atom.io/packages/atom-typescript)패키지를 사용중이라면, F6을 누르면 컴파일 된다.

컴파일 결과로 여러분이 작성한 자바스크립트와 동일한 내용을 담고있는  <font style='color:#C7524F'>greeter.js</font>파일이 생성될 것이다. 우리는 우리의 자바스크립트 어플리케이션에서 TypeScript를 설정하고 실행하고 있다.

이제 우리는 TypeScript가 제공하는 몇가지 새로운 툴들을 사용할 수 있다. 다음 코드에서 보이는 것과 같이 <font style='color:#C7524F'>: string</font> 타입 어노테이션을 'person' 함수의 인자에 추가하여라.

```javascript
function greeter(person: string) {
  return 'Hello, ' + person;
}

var user = 'Jane User';

document.body.innerHTML = greeter(user);
```

### 타입 어노테이션

TyepScript에서 타입 어노테이션은 함수 또는 변수의 의도를 기록하는 간단한 방법이다. 이와 같은 경우, 우리는 greeter 함수가 하나의 string 인자를 가지고 호출되기를 의도한다. 우리는 greeter 함수에 배열을 대신해서 전달하도록 코드를 수정해볼 수 있다.

```javascript
function greeter(person: string) {
  return 'Hellow, ' + person;
}

var user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```

다시 컴파일해보자. 다음과 같은 에러를 보게 될 것이다.

```
greeter.ts(7,26): Supplied parameters do not match any signature of call target
```

비슷하게, greeter 함수 호출 시 모든 인자를 삭제해 보자. TypeScript는 이 함수가 아무런 인자 없이 호출되었다는 것을 알려 줄 것이다. 이 두가지 경우에서, TypeScript는 코드의 구조와 여러분이 제공한 타입 어노테이션을 기반으로 정적 분석을 제공할 수 있다.

**알림** 위 두 예제에서 에러가 발생하기는 했지만, <font style='color:#C7524F'>greeter.ts</font>파일은 여전히 생성된다. 여러분의 코드에서 에러가 발생하더라도 TypeScript를 사용할 수 있다. 그러나 이 경우, TyepScript는 여러분의 코드가 기대한데로 동작하지 않을 것이라는 것을 경고한다.

### 인터페이스

우리의 예제를 좀 더 작성해보자. 여기서 우리는 firstName과 latName 필드를 갖는 오브젝트를 설명하는 인터페이스를 사용한다. TypeScript에서 오브젝트와 인터페이스의 구조가 호환 된다면 두개의 타입은 호환된다. 이것은 명시적으로 <font style='color:#C7524F'>implements</font> 키워드를 사용하지 않고, 인터페이스가 요구하는 형태를 갖는 것만으로도 인터페이스를 구현할 수 있도록 한다.

```javascript
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

var user = {firstName: 'Jane', lstName: 'User'};

document.body.innerHTML = greeter(user);
```

### 클래스

마지막으로, 클래스를 가지고 예제를 확장해보자. TypeScript는 클래스 기반의 객체지향 프로그래밍과 같은 새로운 기능을 지원한다.

여기서 우리는 생성자와 몇개의 public 필드를 가지고 <font style='color:#C7524F'>Student</font>클래스를 생성할 것이다. 클래스와 인터페이스는 함께 잘 어울려서, 프로그래머가 적절한 추상화 레벨을 사용할 수 있도록 한다.

또한, 생성자의 인자들에서 사용된 <font style='color:#C7524F'>public</font>은 인자명으로 프로퍼티를 자동으로 생성되게 하는 간단한 표기법이다.

```javascript
class Student {
  fullName: string;
  constructor(public firstName, public middleInitial, public lastName) {
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

var user = new Student('Jane', 'M.', 'User');

document.body.innerHTML = greenter(user);
```

다시 <font style='color:#C7524F'>tsc greeter.ts</font>를 실행하면, 여러분은 앞선 예제의 코드와 동일하게 생성 된 자바스크립트코드를 보게 될 것이다. TypeScript에서 클래스는 단지 자바스크립트에서 빈번하게 사용되는 프로토타입 기반의 객체를 위한 간단한 표기법에 지나지 않는다.

### TypeScript 웹 어플리케이션 실행하기

이제 <font style='color:#C7524F'>tsc greeter.ts</font>안에 다음 코드를 작성해라.

```html
<!DOCTYPE html>
<html>
<head><title>TypeScript Greeter</title></head>
<body>
  <script src='greeter.js'></script>
</body>
</html>
```

여러분의 첫 간단한 TypeScript 웹 어플리케이션을 실행하기 위해 웹 브라우저에서 <font style='color:#C7524F'>tsc greeter.ts</font>를 열어라.


## 참조

* [Quick start](https://www.typescriptlang.org/docs/tutorial.html)
