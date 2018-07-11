# 부동 소수점 오차 해결하기 

다음과 같은 코드가 있다. 결과가 어떻게 나올까?

```python
1.1 * 1.1 == 1.21
```

아마도 True를 예상하겠지만, 결과는 그 반대이다. 
이유는 **부동 소수점 연산 오류**이다. 

컴퓨터에서는 정해진 비트에 무한수인 실수는 반올림을 통해 근사값으로밖에 표현될 수 없다. 
따라서, 이러한 근사값으로 연산이 수행됨에 따라 연산이 정확하게 이루어지지 않는 문제를 안고 있다. 

## sys.float_info.epsilon

파이썬의 sys.float_info 모듈에 정의 된 epsilon에 저장 된 값을 **Machine Epsilon**이라고 한다.(이는 파이썬에만 존재하는 값이 아니라 부동소수점을 다루는 모든 언어에서 가지고 있는 값이다.)  
어떤 실수를 가장 가까운 부동소수점 실수로 반올림하였을 때 상대 오차는 항상 머신 엡실론 이하입니다. **즉, 머신 엡실론은 반올림 오차의 상한값이며 연산한 값과 비교할 값의 차이가 머신 엡실론보다 작거나 같다면 두 실수는 같은 값이라 할 수 있습니다.**

## Solution

앞서 소개한 **sys.float_info.epsilon**을 통해서 문제를 해결해보았다. 
다음 코드를 확인하자. 

[using_machine_epsilon.py](./src/using_machine_epsilon.py)

```python
import sys, math

ret = math.fabs(1.1*1.1-1.21) <= sys.float_info.epsilon
print(ret)
```

파이썬 3.5 이상버전부터는 위 방법 이외에 **math.isclose** 함수를 통해 좀 더 간편하게 위 문제를 해결할 수 있다. 



## Reference

* [48.5 실수 값의 오차](https://dojang.io/mod/page/view.php?id=1164)