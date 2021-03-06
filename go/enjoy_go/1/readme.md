# 1일차 스터디 

* UNIT 1.  Go 언어란
* UNIT 2.  설치하기 
* UNIT 3.  기본 디렉토리 설정하기
* UNIT 4.  통합 개발환경 사용하기
* UNIT 5.  Hello, world!로 시작하기
* UNIT 6.  기본 문법 알아보기
* UNIT 7.  변수 사용하기
* UNIT 8.  숫자 사용하기
* UNIT 9.  문자열 사용하기
* UNIT 10. 불 사용하기
* UNIT 11. 상수 사용하기
* UNIT 12. 열거형 사용하기


## UNIT 1. Go 언어란

* 1.4 가비지 컬렉션이 실행 파일 내부에 존재하는것에 대해서 
    * 역시 배포가 용이할 것.
    * 하지만 실행 파일 사이즈가 좀 증가할 텐데 큰 문제는 없는지?, 예를들어 딱 가비지 컬렉션만 실행파일안에 들어오고 나머지 go의 기본 라이브러리들은?
	* DLL 성격의 라이브러리 관리 방법이 있는지 확인?
	* go의 기본 라이브러리는 실행파일에 들어오는지 확인?
	* 
* 1.5 병행성
    * 고루틴에 대해서 아직은 이야기하기 이름?
    * 고루틴을 통해 특정 프로세서를 정할 수 있다? 
* 1.6 모듈화 및 패키지
    * 
* 1.7 컴파일 속도
    * 이 부분은 아주 중요. 컴파일과 빌드 과정역시 개발 속도를 늦게 하는 하나의 요소
	* go run 하면 빌드해서 실행까지 ..
    * 이와 같은 관점에서 스크립트 언어가 대두 하지만 컴파일 과정에서 타입 체크하는 부분 역시 개발단계에서의 버그 발생을 엄청나게 개선. 
    * 결국 static type이냐 dynamic type이냐의 문제 여러분의 생각은?
	* 이건 아직 이야기하기 이른듯 ... 

## UNIT 3. 기본 디렉터리 설정하기

* GOPATH
    * 이클립스의 workspace가 생각나는것은 왜 일까? 
    * 일단 특정 개발환경이 지역적으로 완전히 격리되는 것에 대해서는 아주 반가움. 하지만 뭔가 다른 프로젝트를 시작할때마다 새로 설정해줘야하는 번거로움 .. 
	* 다들 번거로움을 느낌.
	* 준하는 dep라는 라이브러리를 이용해서 하나의 GOPATH에서 여러 프로젝트를 관리하려는 시도를 했었음. 
	* 여러 프로젝트를 하나의 GOPATH에서 관리하는 방법에 대해서 고민해보자. 그리고 뭐가 좋은 방법인지 고민 필요. 
    * 뭔가 번거로워 보이지만 개발환겨을 지역적으로 격리하는 이점이 더 큰듯.    
* 기본 디렉토리 구조를 만들어주는 명령어는 없는지?
 	* bin은 빌드할 때 만들어진다고 하니 아마 pkg도 빌드하면 만들어질 듯 확인 필요.
* go install하려고 하니까 에러남 GOBIN 패스 잡으로고 또 나옴 ... 그럼 매번 다른 프로젝트 할 때 이러한 환경 변수를 다 잡아줘야하는건가 ... IDE쓰던 아니면 shell script 작성해두던 ..?
	* 다른 분들은 GOBIN 패스 없이 잘 됨. 

## UNIT 6. 기본 문법 알아보기

* 코딩 컨벤션 안 지켰을 때, 컴파일 에러나는 것은 아주 좋았는데 문법에 익숙해지지 않았을 때는 엄청 스트레스 받을 듯. 좀 더 생가해보면 특별히 코딩컨벤션을 좀 안 맞춘다고 가독성이 심하게 떨어지는 것 같지는 않는데 (일정 수준의 개발자들 .. ) 굳이 이런 제약까지 ...?
	* 오히려 좋은 것 같다. 
* 인덴트 사용 등 세부사항까지는 잡아주지 않는듯 .. 
* 컴파일 이거 ... 간단한 예제 연습할 때 정말 짜증남 .. Scala같은 경우 compile 언어지만 CLI 지원 Go도 있을 듯 ... 
	* Go CLI 

## UNIT 7. 변수 사용하기 

* function을 정의할 때는 타입을 정의하는 것이 문서화 측면에서도 아주 좋은 듯.
* 하지만 fucntion 내부의 코드를 작성할 때는 타입 정의하는 코드는 거의 사용하지 않을 듯. 단 메모리를 아끼기 위해 작은 타입을 사용해야하는 경우 위해서 쓴다? 별로 안쓸듯 ...
* 사용하지 않는 변수와 패키지 처리하는 코드의 필요성? 
	* python에 안쓰는 변수를 _ 로 처리할 수 있음. 
	* python에서는 튜플형태의 리턴값에 대해서 안쓰는 변수를 가릴때 사용. 
	* python에서 if문으로 처리하는 것보다 try-catch가 더 빨라 이를 이용하는 경우 있음. 
	* Go에서도 같은 경우도 위와 같이 사용한다. 
	* 이 부분에 대해서는 불편으로 느끼는 편과 그렇지 않은 편이 나뉨
	* 컴파일은 DEBUG모드와 RELEASE 모드를 분리해서 DEBUG 모드에서는 warning이고 RELASE에서는 error로 구분하는것도 좋은 방법.

* var()의 유용성? const와 불리해서 변수를 정의할때?
	* 변수, const, import 등을 구분지어 관리할 수 있어서 좋음. 
	* 변수 사용시 a       = 1 이런 건 검색 시 문제가 있음. 
	* 헝가리안 표기가 예전에 의미가 있었지만 IDE의 발전과 코드를 길게 안짜는 방법등으로 인해 사라진듯. 


## UNIT 8. 숫자 사용하기 

* 머신 입실론은 정말 충격적. 이런거 있는지 정말 몰랐음 ... 그동안은 어떻게 비교한거지?
* .35보다는 0.35가 좀 더 가독성 있음. 
* uint8 255 + 1이면 0이 나옴.
* overflow에 대해서는 좀 더 확인 
* C에서는 overflow나면 0으로 돌아오고 rotate의 경우는 이를 유용하게 사용하는 경우가 있음 (확인)

## UNIT 9. 문자열 사용하기 

* 문자열을 '으로 표현 못하는건 좀 불편한듯. 
* java, c#, javascript, python, go까지 문자열은 immuable한데 이렇게 설계하는 이유가 뭘까?
	* 모름. 확인 해보자.
* go에서 str := "한글" str[0]는 어찌 나오는지 확인 필요. 
* []로 접근하는 것은 java는 기억 안나고 나머지는 다 지원하는듯. 

## UNIT 11. 상수 사용하기 

* python에는 없는 상수. 거의 모든 언어들에 존재하고 나의 경우 아주 유용하게 사용하고 있는데 어떻게들 생각하는지? 잼있는건 python에 상수가 없다고 불편했던 적은 딱히 없음 ... 
	* python에서 named tuple을 통해 상수를 만들수 있음. 이러한 프랙티스가 있는지 확인. 
	* python에서 const가 없으므로써 불안감은 잇음. 
* 상수는 주소값을 구할 수 없음. 왜 그렇게 되는지? 확인 필요.
* 


## UNIT 12. 열거형 사용하기 

* 역시 python에 없던 enum .. 이거 없어서 불편한 적은 없었던듯 ... 다만 뭔가 상수들은 종류별로 관리 못한다는 단점은 있는것 같은데 ... 이제 어떻게 활용했었는지 기억이 안남 ... ㅒ
* enum의 용도를 좀 더확인해보자. 
* python의 enumerator는 list에 순서를 준다. 
* itoa가 있음으로써 연산해서 넣는 장점이 있음. 그런데 연산해서 활용하는 지점이 뭐가 있을까?


