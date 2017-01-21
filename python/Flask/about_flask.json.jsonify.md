# flask.json.jsonify에 대해서

지난 번 [Flask의 라우팅과 Angular.js 1의 $http 서비스를 통해 REST API 처리하기](./UsingRouter/readme.md) 문서를 작성할 때 웹 서핑을 하면서 flask.json.jsonify라는 메소드를 알게 되었는데 시간 관계상 자세히 확인을 하지 못했다. 오늘 이 메소드에 대해서 알아보고자 한다.

처음에 메소드 이름만 보고(자바스크립트의 JSON.stringify랑 비슷해서 ..) 파이썬의 딕셔너리를 JSON 데이터로 변경해주는 메소드인가보다 했다. 그래서 관련 내용을 검색해보니 다음과 같은 답변이 있었다. (__참고로 아래 인용글에 'Edit:'로 시작하는 글이 더 있었는데 공식 Flask 문서의 [flask.json.jsonify](http://flask.pocoo.org/docs/0.12/api/#flask.json.jsonify)의 설명과 내용이 맞지 않은것 같아서 인용에서 뺐다.__)

>The jsonify() function in flask returns flask.Response() object that already has the appropriate content-type header 'application/json' for use with json responses, whereas the json.dumps() will just return an encoded string, which would require manually adding the mime type header.
>
>See more about the jsonify() function here for full reference.

[flask.json.jsonify](http://flask.pocoo.org/docs/0.12/api/#flask.json.jsonify) 메소드는 Content-Type이 'application/json'으로 설정 된 flask.Response()를 반환하는 반면, json.dumps는 단지 파이썬 오브젝트를 JSON형태의 문자열로 반환해주는 역할을 한다는 것이다. 따라서, [flask.json.jsonify](http://flask.pocoo.org/docs/0.12/api/#flask.json.jsonify) 메소드는 REST API를 설계할 때 클라이언트의 요청에 대한 응답을 만들 때 사용하면 유용할 것이다.

## 참조

* [json.dumps vs flask.jsonify](http://stackoverflow.com/questions/7907596/json-dumps-vs-flask-jsonify)
* [flask.json.jsonify](http://flask.pocoo.org/docs/0.12/api/#flask.json.jsonify)
