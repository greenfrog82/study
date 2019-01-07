# About including a body with a GET request

`GET`메소드에서 `Query String`을 사용하지 않고, `Body`를 사용해도 되는걸까? 이에 대해서 `Roy Fielding`은 다음과 같이 언급했다고한다.  

[Roy Fielding's comment about including a body with a GET request.](https://groups.yahoo.com/neo/groups/rest-discuss/conversations/messaes/9962)
>어떤 `HTTP Request`던 `Message Body`를 포함할 수 있으므로 이를 염두해두고 `Message`를 파싱해야한다. 그렇다 하더라도 `GET`메소드를 아무 의미없이 사용한다 하더라도 `Message Body`의 사용은 서버에서 해석하는 의미로는 사용이 제한됩니다. 이렇게 되면 메소드의 의미와 요청의 의미가 분리되게 된다.   
>
>물론, `GET`메소드와 함께 `Message Body`를 사용해도되지만,이는 별로 유용하지 않다. 

# Reference

* [HTTP GET with request body](https://stackoverflow.com/questions/978061/http-get-with-request-body)


