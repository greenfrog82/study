# Problem

inputs라는 정수 배열과 n이라는 정수를 인자로 받는 함수가 있다.   
이때, inputs 배열에 요소들을 더하여 n이되는 조합을 반환하는 함수를 작성하라. 단, 더하는 요소들은 중복되어서는 안된다. 

예를들어, 다음과 같이 1부터 5까지의 원소를 갖는 배열 inputs가 있다고 가정하자.  
이때, 각각 중복되지 않는 원소들로 합을 구하면 다음과 같다. 

```python
inputs = [1, 2, 3, 4, 5]

1 + 2 = 3
1 + 3 = 4
1 + 4 = 5
1 + 5 = 6
2 + 3 = 5
2 + 4 = 6
2 + 5 = 7
3 + 4 = 7
3 + 5 = 8
```

구현 된 함수가 다음과 같다고 할 때 각각의 호출 결과는 다음과 같다.  

```python
def find_elements(inputs, n):
    # your codes ..

ret = find_elements(inputs, 5) 
# [(1, 4), (2, 3)]
ret = find_elements(inputs, 6) 
# [(1, 5), (2, 4)]
ret = find_elements(inputs, 7) 
# [(2, 5), (3, 4)]
```