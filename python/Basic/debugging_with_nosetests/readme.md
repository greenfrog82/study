# How to debug with nosetests

python에서 debugging을 할 때 일반적으로 pdb를 사용한다. 
그런데 [nosetests](http://nose.readthedocs.io/en/latest/)를 통해 테스트를 할 때 pdb를 적용해놓은 코드가 동작하지 않고 block되어 있는 현상을 발견하였다. 

따라서, nosetests와 pdb를 함께 사용하는 방법을 확인해보았다. 

## Uinsg -s option with nosetests

nosetests command를 사용할 때 다음과 같이 -s 옵션을 함께 사용해주면 된다. 

> $ nosetests -s ...

-s 옵션에 대해서 -h 옵션을 통해 help를 보면 다음과 같다. 

>-s, --nocapture       Don't capture stdout (any stdout output will be
                        printed immediately) [NOSE_NOCAPTURE]

nosetests는 -s 옵션 없이 동작을 할 때는 test code들의 stdout에 대한 출력을 캡처하여 화면에 출력하지 않는다. 
따라서, pdb의 command가 stdout을 통해 출력 되었지만 화면에 나타나지 않아 block된 것 처럼 보인것이다. 

마찬가지로 test code에 print 함수를 통해 출력하는 내용들 역시 -s 옵션을 사용하지 않으면 화면에 출력되지 않는다.

## Reference 

* [setting breakpoints with nosetests --pdb option](https://stackoverflow.com/questions/4950637/setting-breakpoints-with-nosetests-pdb-option)
