# About Test

개발자로서 알아야하는 테스트 개념 정리 .. 

## Smoke Testing

**Smoke Testing**이란 **Build Verification Testing**이라고도 알려져있는데, 이는 소프트웨어 테스팅 방법 중 하나로 세밀한 테스트를 위한 방법은 아니고 소프트웨어의 **가장 핵심적인 기능**을 테스트하기 위한 테스팅 방법이다. **이 테스트의 결과를 통해 해당 빌드가 다음 단계의 테스트를 진행하기에 충분히 안정적**인지를 판단할 수 있다.  

예전에 하드웨어 제품을 테스트할 때 최초 실행 시켰을 때 연기(불이)가 나지 않으면 다음 테스트로 전달하였다. **Smoke Testing**이란 용어는 이러한 의미의 하드웨어 테스트 방식에서 유래하였다. 

## A/B Testing

**A/B Testing (bucket tests or split-run testing)**는 하나의 변수를 가지고 두 가지 구현체를 만들어 성능을 테스트하는 것이다.  

예를들어, 웹 사이트를 개발한다고 가정하자. 이때 버튼의 디자인을 어떻게 할 지 결정이 나지 않았다. 한쪽에서는 둥글로 진한 녹색으로 만들자 하고 한쪽에서는 사각형에 연두색으로 만들자 한다.  
이러한 경우 동일한 웹 사이트에 둥글로 진한 녹색의 버튼으로 하나 만들고 사각형에 연두색 버튼으로 하나를 만들어서 어떤 버튼을 임의의 사용자가 더 자주 누르는지 테스트해 볼 수 있다. 이를 통해 사용자가 선호하는 버튼 디자인을 찾는 것이다.  

## Reference

* [Smoke Testing](http://softwaretestingfundamentals.com/smoke-testing/)
* [A/B Testing](https://en.m.wikipedia.org/wiki/A/B_testing)