# JSON 데이터 다루기

## 개요

파이썬에서 JSON 데이터를 다루기 위해서는 json 모듈을 사용해야한다.

## 파싱하기

JSON 데이터를 파싱하면 딕셔너리 형태로 데이터를 메모리에 올린다. 관련 코드는 다음과 같다.

```python
# 파싱하기
# data.json 파일을 읽은 후 해당 파일 오브젝트를 json 모듈의 load 메소드로 전달해주면 된다.
with open('./data.json') as json_data:
    dic = json.load(json_data)

# 파싱한 내용 출력
print(dic)
```

## JSON 형식으로 변환하기

딕셔너리를 JSON 형식 문자열로 변경하는 방법은 다음과 같다.

```python
# 파싱 된 json 데이터를 다시 json형태로 변환하기
jsonFormat = json.dumps(dic)
print(jsonFormat)
```
## 참조

* [Reading a JSON file using Python](http://stackoverflow.com/questions/20199126/reading-a-json-file-using-python)