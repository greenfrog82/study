# How to manage settings.py for multiple environment

Django를 통해 웹 서비스를 개발하고 운영하다보면 settings.py 파일의 설정을 다양하게 관리해야하는 경우가 발생한다. 가장 일반적인 예로 개발환경과 운영환경의 설정이 다를 수 있고, 개발환경이라고 설정 역시 각 개발자마다 다를 수 있다. 

앞서의 내용을 좀 더 구체적으로 이야기해보면 운영환경에서는 Debug 설정이 False로 꺼져있어야 할 것이고 DB는 운영환경의 DB 설정을 가지고 있어야 할 것이다. 개발환경에서 역시 어떤 개발자는 'debug_toolbar'와 같은 APP을 추가하여 사용할 수도 있지만 그렇지 않은 개발자가 있을수도 있다. 

물론, 이러한 설정들을 Git에 commit하지 않고 working directory에서 관리하면 될 수도 있지만 특정 자신만의 개발 설정을 가지고 있다가 설정 파일이 삭제되거나 또 특정 설정 내용만 Git에 추가해줘야할 떄 이러한 설정파일의 관리가 유연하지 못하게 된다.

따라서, 다음과 같이 설정 파일을 관리할 수 있는 방법을 고민해보았다. 

* 개발 환경과 운영 환경의 설정 파일을 따로 관리할 수 있어야한다. 
* 개발 환경의 설정 역시 각각 개발자가 따로 관리할 수 있어야한다. 
* 중복 된 설정이 발생하지 않도록 해야한다. 

위 조건들 중 '중복 된 설정이 발생하지 않도록 해야한다.'가 아주 중요한데, 개발 환경과 운영 환경의 설정파일이 나뉘고 개발 환경에서는 각각 개발자 별로 설정이 나뉘게 되면 결국 Git에서 관리되어야 하는 설정이 발생하게 되면 운영 환경과 개발 환경 그리고 각각 개발자 별로 관리되는 설정들을 모두 수정해주어야 하기 때문이다. 



## Reference

* [Django Best Practice: Settings file for multiple environments](https://medium.com/@ayarshabeer/django-best-practice-settings-file-for-multiple-environments-6d71c6966ee2)