# C#에서 JSON 사용하기

C#에서 JSON을 사용하기 위해서는 [Json.NET](http://www.newtonsoft.com/json)라이브러리를 사용한다. 하지만 해당 라이브러리를 사용하면서 한가지 불만족스러운면이 있었다.

다음의 json파일은 일반적인 json파일을 작성하는 코딩 컨벤션을 따르고 있다.

```json
{
  "name": "greenfrog",
  "age": 36
}
```

 이를 [Json.NET](http://www.newtonsoft.com/json)을 통해 다음 클래스로 읽어들이면 정상적으로 읽어진다.

 ```csharp
 class Person {
   public string Name { get; set; }
   public int Age { get; set; }

   public Person(string name, int age) {
     Name = name;
     Age = age;
   }
 }
 ```

하지만, 일단 C# 클래스로 읽어들은 Person객체를 다시 [Json.NET](http://www.newtonsoft.com/json)을 통해 json형식으로 변환시키면 다음과 같이 변환이된다.

```json
{
  "Name": "greenfrog",
  "Age": 36
}
```

코딩 컨벤션에 대한 강박이 있는 나에게 있어서 이러한 변환은 용서가 되지 않는다. json은 json의 코딩 컨벤션을 유지하고 C#에서는 C#의 코딩 컨벤션을 유지하고 싶다. 다음 예를 하나 더 보자.

```json
{
  "name": "greenfrog",
  "age": 36,
  "main_job": "Programmer",
  "sub_job": "Diver"
}
```

위 json 데이터를 다음과 같이 C# 코딩 컨벤션을 지키고 있는 클래스로 읽어들이고 싶다.

```csharp
class Person {
  public string Name { get; set; }
  public int Age { get; set; }
  public string MainJob {get; set;}
  public string SubJob {get; set;}

  public Person(string name, int age, string mainJob, string subJob) {
    Name = name;
    Age = age;
    MainJob = mainJob;
    SubJob = subJob;
  }
}
```

이를 [Json.NET](http://www.newtonsoft.com/json)통해 실행해보면 다음과 같은 MainJob과 SubJob에 해당하는 속성이 읽어지지 않는다.

![error](./error.png)

**결국 하고싶은 것은 json은 json을 작성할 때 사용하는 코딩 컨벤션을 사용 및 유지하고, C#에서는 C#을 작성할 때 사용하는 코딩 컨벤션을 사용 및 유지것이다.**

이를 하기위해서 [JsonNet](./JsonNet)이라는 C# 모듈을 개발했으며, 사용방법은 다음과 같다.

[example](./TestConsoleApp/Program.cs)
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestConsoleApp
{
    class Program
    {
        class Person
        {
            public string Name { get; set; }
            public int Age { get; set; }
            public string MainJob { get; set; }
            public string SubJob { get; set; }

            public Person(string name, int age, string mainJob, string subJob)
            {
                Name = name;
                Age = age;
                MainJob = mainJob;
                SubJob = subJob;
            }
        }

        static void Main(string[] args)
        {
            string param = System.IO.File.ReadAllText(@".\..\..\sample2.json");

            Person person = JsonNet.Serialize.JsonSerializeHelper.Deserialize<Person>(param);
            Console.WriteLine(person.ToString());

            param = JsonNet.Serialize.JsonSerializeHelper.Serialize(person);
            Console.WriteLine(param);   
        }
    }
}
```

## 참조

* [Json.NET](http://www.newtonsoft.com/json)
