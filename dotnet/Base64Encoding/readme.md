# Base64 인코딩/디코딩 방법 및 사용하는 이유

Base64로 인코딩 및 디코딩하는 방법은 각각 다음과 같다.

```csharp
public static string Base64Encode(string plainText)
{
    var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
    return Convert.ToBase64String(plainTextBytes);
}

public static string Base64Decode(string base64EncodedData)
{
    var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
    return Encoding.UTF8.GetString(base64EncodedBytes);
}
```

그러면, 이러한 Base64 인코딩/디코딩은 왜 사용하는 것일까?

8비트를 1바이트로 구성되는 바이너리 데이터를 문자열로 변환하려고 할 때 1문자당 7bit를 사용하는 ASCII형태로 변환하려는 경우 호환이 되지 않는다. 또한 이기종간에 데이터를 전송하고자 하는 경우 어떤 시스템에서는 특정 비트의 데이터를 삭제하는 경우도 있다. 게다가 New Line에 대한 이기종간 인코딩 방식이 다른 것 역시 데이터 전송 시 문제가 된다.

위와 같은 문제를 해결하기 위해서 Base64 인코딩/디코딩을 사용한다. 

## 참조

* [How do I encode and decode a base64 string?](http://stackoverflow.com/questions/11743160/how-do-i-encode-and-decode-a-base64-string)
* [Why do we use Base64?](http://stackoverflow.com/questions/3538021/why-do-we-use-base64/3538079#3538079)
