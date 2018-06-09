# Find the numbers to be N by adding elements of the array

inputs라는 정수 배열과 n이라는 정수를 인자로 받는 함수가 있다.   
이때, inputs 배열에 요소들을 더하여 n이되는 모든 조합을 반환하는 함수를 작성하라. 단 시간복잡도는 O(n).

예를들어, 다음과 같이 1부터 5까지의 원소를 갖는 배열 inputs가 있다고 가정하자.  
이때, 각각 중복되지 않는 원소들로 합을 구하면 다음과 같다. 

```python
inputs = [1, 2]

1 + 1 = 2
1 + 2 = 3
2 + 1 = 3
2 + 2 = 4
```

이때 더해서 3되는 수의 조합은 다음과 같다. 

```python
1 + 2 = 3
2 + 1 = 3
```

구현 된 함수가 다음과 같다고 할 때, 호출 결과는 다음과 같다.  

```python
def find_elements(inputs, n):
    # your codes ..

ret = find_elements(inputs, 2) 
# [(1, 2), (2, 1)]
```