# What is the serverless architecture?

## Serverless Architecture

초기에 serverless architecture라 하면 server-side logic과 state를 서비스하고 관리하기 위해 클라우드에 존재하는 third-party service이다.  
하지만 요즘에는 stateless compute container에 의해 정의되고 event-driven solution에 의해 모델링 된 service이다.  

복잡하게 이야기했지만, 간단히 이야기하면 서버가 없다는 것이다. 그렇다고 정말 서버가 없는 것은 아니고 서버의 관리적인면을 추상화하고 low-level infrastructure에 대한 고민을 개발자가 되도록 하지 않도록 하기 위한 아키텍처로 결국 개발자의 생산성을 높이고 서버의 운영 비용을 줄이기 위한 목적을 가지고 있다.  

## FaaS (Function as a Service)

**FaaS**는 비교적 새로운 개념으로 2014년 hook.io에서 처음 발표된 후 현재는 다음과 같은 서비스들이 구현되어있다. 

* AWS Lambda
* Google Cloud Functions
* IBM OpenWhisk
* Microsoft Azure Functions

앞서 나열해 놓은 서비스들은 Serverless Architecture를 실현할 수 있는 수단을 제공한다.  
**FaaS**는 프로젝트를 여러개의 함수로 쪼개서, 클라우드 서비스에 등록한 후 이 함수들이 실행되는 횟수만큼 비용을 내는 서비스이다. 

FaaS의 장단점은 다음과 같다. 

### Advantages

* 좀 더 많은 시간을 개발을 하는데 시간을 사용할 수 있다. 
* 함수 단위로 서비스를 확장할 수 있기 때문에 Monolitic 구조로 되어 있는 서비스들이나 MSA 형태의 서비스들 보다 확장성이 높다. 
* 일반적인 서비스들은 호출되지 않는 기능들까지 유지하기 위한 비용이 발생하지만 FaaS는 호출되지 않는 비용들에 대해서는 비용이 발생하지 않는다. 
* 서비스 자체에서 고가용성을 보장한다. 

### Disadvantages

* 외부에 서비스를 맡기기 때문에 전체 시스템을 이해하기 어렵다. (이걸 모르려고 하는건데 이게 단점인가?)
* 희박한 가능성이지만, FaaS 제공사에 의존하게 되어 있기 때문에 해당 회사에 문제가 발생하는 경우 영향을 받는다. 예를들어 장애가 발생하거나 망하거나;;
* 디버깅이 어렵다. remote debugging이나 local development environment를 미러링해주는 도구들이 존재하지만 아직 부족한 실정.
* 함수 호출에 대해서 자동으로 스케일링을 한다는 것은 결국 비용도 역시 자동으로 스케일링된다는 것을 의미한다. 
* 이미 많은 양의 함수가 배포되어 있다면, 이들을 모니터링하는것이 어려워질 수 있다. 따라서 이러한 문제를 하기위해 좀 더 낳은 도구들이 필요하게 된다. 
* 상태없는 요청(ex. DB connection)과 재사용 네트워크 요청 사이 리소스 캐싱 솔루션은 아직 보류중이다. 
* 비교적 신기술이기 때문에 경험치가 낮다. 

## What is difference between FaaS and PaaS?

FaaS와PaaS는 서버의 배포 및 운영에 대한 관심의 분리를 이뤄냈다는 측면에서 유사해 보인다. 

![faas_diagram](./faas_diagram.jpg)
![m_vs_faas](./m_vs_faas.png)

하지만, 이 둘은 분명한 차이점을 가지고 있다. **PaaS**의 경우는 어플리케이션 전체를 배포되고 24시간동안 실행된다. 일반적으로 Monolothic한 서비스나 MSA를 기반으로한 어플리케이션들이 해당할 것이다.  
반면에 **FaaS**의 경우는 어플리케이션이 아닌 함수를 배포한다. 그리고 이러한 함수들이 24시간동안 실행되고 있는 것이 아니라 특정 이벤트에 의해 실행되었다가 작업을 마치면 종료된다.  

결국 비용적인 측면에서 **PaaS**는 10개의 API를 가지고 있고 이중 일평균 2, 3개의 API가 중점적으로 호출되는 어플리케이션이 있다고 가정할 때 이러한 어플리케이션을 24시간 유지하기 위해서 비용을 지불해야하지만, **FaaS**의 경우는 호출되는 API의 수만큼 비용을 지불하기 때문에 좀 더 저렴하게 서비스를 유지할 수 있다.  

하지만 앞서 FaaS의 Disadvantages에서도 살펴보았지만, **FaaS**의 경우 디버기잉 어렵다거나 DB의 Connection Pool을 활용하기 어렵다거나하는 등의 문제들이 존재하지만 **PaaS**의 경우는 이러한 문제점이 없다는 측면도 존재합니다. 

## Use case

* Backend: 서비스의 백엔드를 FaaS 로 구현 할 수 있다.
* Crawler: 주기적으로 페이지를 긁어서 수집 할 수 있다. 
* 파일 처리: 파일을 업로드하고, 화질/사이즈를 조정하고, S3 같은 스토리지에 저장하는 기능을 구현 할 수 있다. 
로그 분석 / 실시간 모니터링: 예를 들어, 특정 컴퓨팅 자원이 CPU 사용량이 70% 에 도달 했을 때, Slack 등을 통하여 알림을 받고 싶다면 AWS 의 Cloudwatch/CloudTrail 과 연동하여 알림을 받을 수 있다.
* 자동화 작업들: Netflix 의 경우엔, 동영상이 됐을 때, 인코딩하고, 검증하고, 태깅하고, 공개하는 작업들을 Lambda 를 통하여 자동화 시키고 백업 관련 작업도 Lambda 로 처리했다고 한다. 

## TODO

* 앞서 소개한것들을 기반으로 직접 경험해보고 경험과 비교해보기.
* 실제 요기요 서비스에서 Serverless Architecture를 적용했을 때 좀 더 효율적일 수 있는 부분에 대해서 생각해보기.

# Reference

* [SERVERLESS ARCHITECTURE THE FUTURE OF BUSINESS COMPUTING](https://www.marutitech.com/serverless-architecture-business-computing/)
* [An Introduction to Serverless and FaaS (Functions as a Service)](https://medium.com/@BoweiHan/an-introduction-to-serverless-and-faas-functions-as-a-service-fb5cec0417b2)
* [What is Serverless Architecture? What are its criticisms and drawbacks?](https://medium.com/@MarutiTech/what-is-serverless-architecture-what-are-its-criticisms-and-drawbacks-928659f9899a)
* [서버리스 아키텍쳐(Serverless)란?](https://velopert.com/3543)
