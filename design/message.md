# Message를 관리하기 적합한 저장소에 대해서

팀 코드리뷰 시간에 다국어를 지원하는 메시지의 일부가 DB에서 관리되는 코드를 보고 이야기를 나눴다. 전 직장에서는 다국어를 지원하는 메시지를 DB에서 관리하던 xml과 같은 형식에 파일에서 관리하던 특별한 이슈가 없었기 때문에 뭐가 문제인지 잘 몰랐는데 
오늘 리뷰를 하면서 DB에서 메시지와 같은 형식의 데이터를 관리하는 것이 비효율적이라는 것을 알게 되었다. 

우선, DB에서 이러한 메시지를 관리하는 것과 xml과 같은 형식으로 관리하는 것에 어떤 차이가 있을까?
해당 메시지를 관리하는 측면과 성능적인 측면에서 생각해볼 수 있다.

**관리적인 측면**에서 보면 이 둘은 거의 차이가 없다. 메시지라는 것은 수정이 가능한 파일에서 관리하더라도 서비스를 하는 측에서 수정하는 용도로 사용되는 것이 아니기 때문에 설정파일과는 그 목적이 다르다. xml과 같은 문서형태든, 컴파일 된 바이너리 또는 DB형태든 어떠한 형태로 제공되어도 관리적인 측면에서 달라지는 것은 없으며 메시지가 추가, 변경, 삭제되면 이 메시지가 저장되어 있는 매체에 대해서 이러한 작업이 수행되어야하고 다시 배포되어야한다.

그러면 **성능적인 측면**에서는 어떨까? 일반적으로 DB에서 메시지를 관리하지 않고 *.po과 같은 파일을 사용하는 이유는 간단한 언어 설정에 대한 내용을 DB에서 처리하고 있으면 성능상 오버헤드가 발생하기 때문이다.
예를들어, *.po파일을 통해서 언어 처리를 하면 웹 어플리케이션이 메모리로 올라갈때 함께 올라가기 때문에 데이터를 가져오는데 있어서 별도의 오버헤드가 전혀 발생하지 않는다. 
하지만, DB를 사용하는 경우 메시지를 처리하기 위해 DB에 access(Request, Respone)해야하는 트래픽이 발생한다. 간단히 메모리에서 처리하면 되는 일이 관리상 별 이득도 없는 DB를 이용해서 처리하기 때문에 성능만 손해를 보는것이다. 
그렇다고 파일 DB를 쓴다 하더라도 마찬가지인 것은 파일 DB의 경우 역시 File DB에 대한 access가 발생한다. Network 트래픽은 없더라도 결국 I/O가 발생하는것이다.

결론적으로 성능적인면에서의 차이로 인해 설정파일, 메시지 정보 등은 파일을 통해 메모리에 로드 된 형태로 동작하는 것이 설계적으로 옳다고 생각된다. 
