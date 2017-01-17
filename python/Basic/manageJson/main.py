import json

# 파싱하기
# data.json 파일을 읽은 후 해당 파일 오브젝트를 json 모듈의 load 메소드로 전달해주면 된다.
with open('./data.json') as json_data:
    dic = json.load(json_data)

# 파싱한 내용 출력
print(dic)

# 파싱 된 json 데이터를 다시 json형태로 변환하기
jsonFormat = json.dumps(dic)
print(jsonFormat)
