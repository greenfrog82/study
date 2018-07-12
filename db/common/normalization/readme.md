# Database Normalization

Database Normalization(이하 정규화)는 데이터베이스를 설계하는 방법으로 이를 통해 테이블에 저장되는 데이터의 중복을 줄이고 삽입,갱신,삭제 시 발생할 수 있는 이상현상을 방지할 수 있다.  
정규화는 1차, 2차, 3차 그리고 4차, 5차 정규화가 존재하지만 현업에서는 1 ~ 3차까지의 정규화를 통해 거의 모든 문제를 해결할 수 있다. 따라서 본 문서에서는 1 ~ 3차까지의 정규화를 다룬다.   
각 정규화 단계는 포함관계로 2차는 1차 정규화를 만족해야하고, 3차는 1차와 2차 정규화를 만족해야한다. 

## The Problem of Non-normalization

예를들어, 다음과 같은 Table Student 있다고 가정하자. 

| Student ID  | Name   | Address | Subject | 
| ----------- | ------ | ------- | ------- |
| 1           | Adam   | Noida   | Bio     |
| 2           | Alex   | Panipat | Maths   |
| 3           | Stuart | Jammu   | Maths   |
| 4           | Adam   | Noida   | Physics |


위 테이블은 정규화가 되어 있지 않다.   
학생의 경우 여러개의 과목을 들을 수 있지만 이에 대한 고려가 없어 여러개의 과목을 듣기위해 불가피하게 학생 정보을 중복으로 저장해야하기 때문이다.   
위 테이블을 보면 Adam이 Bio와 Physics 과목을 수강하기 위해 Adam이라는 학생 정보(Name, Address)가 중복으로 저장된 것을 확인 할 수 있다.  

이렇게 정규화가 되지 않은 경우 앞서 **삽입,갱신,삭제 시 이상현상**이 발생할 수 있다고 이야기 했었는데 위 테이블을 통해 확인해보자.  

### Insertion Anomaly
    
> 새 데이터를 삽입하기 위해 불필요한 데이터도 함께 삽입해야 하는 문제를 **Insertion Anomaly**라고 한다. 

위 테이블에서 수강을 하지 않은 학생을 추가해야한다고 가정하자. 그리고 Subject column은 **not null**이라는 제약이 걸려있다.  
이러한 경우, 수강하지 않는 상태를 표시하기 위한 별도의 값을 통해 삽입이 이루어져야한다.  
사실 정규화가 잘 이루어져서 과목 테이블이 별도로 존재하고 이들을 연결해주는 Iterim Table이 존재한다면 이러한 입력이 필요없는데 위 테이블 구조에 맞춰서 수강하지 않는 학생을 표현하기 위해 불필요한 데이터가 함께 입력 되는 것이다.  

### Update Anomaly

> 중복 튜플 중 일부만 변경하여 데이터가 불일치하게 되는 문제를 **Update Anomaly**라고 한다.

위 테이블에서 Adam의 주소를 변경한다고 가정하자.  
이때, 변경이 이루어져야하는 튜플은 1, 4행이다. 하지만 실수로 1번행은 수정하고 2번행을 수정하지 않았다면 Adam의 주소가 불일치하게 된다. 

### Delete Anomaly

> 튜플을 삭제하면 꼭 필요한 데이터까지 함께 삭제되는 문제를 **Delete Anomaly**라고 한다. 

위 테이블에서 Alex가 Maths라는 과목을 듣기 싫어서 해당 과목을 철회했다고 가정하자.  
이를 위해 Alex의 수강정보를 삭제한다면 Alex라는 학생에 대한 학생 정보까지 영영 사라지게 된다. 졸지에 Alex는 학교에서 퇴학되어 버렸다;;

## Functional Dependency

위 문제를 Normalization을 통해 해결하기 전에 Functional Dependency에 대해서 먼저 확인을 해야한다.  
Normalization을 하기 위해서는 각 Attribute(Column)간의 Relation을 파악해야하는데, 이 Attribute들간의 Relation을 Functional Dependency라고 한다.   
사실, 각 단계의 Normalization이라는 것은 이러한 Relation을 파악해서 Full Functional Relation을 만들어가는 과정이다. 

Functional Dependency는 다음과 같이 표현될 수 있다. 

> X -> Y

* X는 결정자, Y는 종속자라고 한다. 
* X가 Y를 결정한다. 예를들어, X가 학번이라고 했을 때 학번을 통해서 결정될 수 있는 Y는 해당 학생의 이름, 나이, 학과 등이 될 수 있다. 
* Y는 X에 함수적으로 종속되어 있다. 

### Partial Functional Dependency

> 속성집합 Y가 속성집합 X의 전체가 아닌 일부분에도 함수적으로 종속된 상태

### Transitive Functional Dependency

> A -> B 이고 B -> C 이면 A -> C 인 상태 

### Full Functional Dependency

> 속성집합 Y가 속성집합 X 전체에 대해서만 함수적으로 종속된 상태

각 Function Dependency들의 예는 Normalization 과정을 통해 함께 살펴보기로 하자.

## 1NF(Normalization Form 이하 생략)

> 1NF는 각 Column의 데이터가 Atomic해야한다. 

앞서 Table Student의 경우 Adam이라는 학생이 두 개의 과목을 수강하기 위해서 중복 삽입되는 문제가 있었다. 
이는 1NF에 부합되지 않는다. 이 문제를 히결하기 위해서는 학생 정보와 과목 정보를 분리해야한다.  

**Table Student**

| Student ID  | Name   | Address |
| ----------- | ------ | ------- |
| 1           | Adam   | Noida   |
| 2           | Alex   | Panipat |
| 3           | Stuart | Jammu   |

**Table Subject**

| Subject ID | Name    |
| ---------- | ------- |
| 1          | Bio     |
| 2          | Maths   |
| 3          | Physics | 

위와 같이 분리를 하게되면 각 테이블마다 중복되는 데이터가 존재하지 않는다. 

다름과 같은 경우 역시 1NF의 대상으로 앞서와 같은 형태로 변경할 수 있다. 

**Table Student** 
| Student ID  | Name   | Address | Subject             |
| ----------- | ------ | ------- | ------------------- |
| 1           | Adam   | Noida   | Bio, Maths, Physics | 
| 2           | Alex   | Panipat | Bio                 |
| 3           | Stuart | Jammu   | Maths               | 
     

## 2NF

>  Partial Functional Dependency가 존재하는 경우 이를 Full Functional Dependency가 되도록 하는 것.

앞서 1NF을 통해 분리한 Table Student와 Table Subject를 참조하여 학생들의 수강 과목에 대한 성적을 저장하는 Table Grade은 다음과 같다. 

| Student ID | Subject ID | Name    | Grade |
| ---------- | ---------- | ----    | ----- |
| 1          | 1          | Adam    | A+    |
| 1          | 2          | Adam    | A     |
| 2          | 3          | Alex    | B+    |
| 3          | 2          | Sturart | B     |

위 테이블의 경우 **Name Column의 데이터 중 중복된 데이터를 가지고 있으며(Adam) Partial Functional Dependency**를 가지고 있다.

>**Consideration**  
>
>Student ID 컬럼을 보면 Student ID 중 '1'이 중복된 것을 알 수 있다. 하지만 앞서 Name Column에 대해서만 중복된 데이터를 언급하고 Student ID는 언급하지 않았다.   
>이는 해당 테이블의 경우 Student ID와 Subject ID를 통해 튜플이 구분되고 있으므로 사실 상 중복된 데이터가 아니다.  
>또한 각각 Parent Table을 참조하고 있는 값이기 때문에 삽입,갱신,삭제 시 이상현상이 발생하지 않는다.  
>따라서, 위와 같이 Parent Table을 참조하는 컬럼과 두개 이상의 컬럼을 통해 튜플이 구분되는 경우 중복으로 간주하지 않는다.  

Name Column의 중복 문제는 1NF 위반이므로 당연히 해결되어야하는 문제이고 **Partial Functional Dependency**가 위 테이블에서 어떤 형태로 나타나고 있는지 알아야 이 문제를 해결 할 수 있을 것이다.  
앞서 **Partial Functional Dependency**는 **속성집합 Y가 속성집합 X의 전체가 아닌 일부분에도 함수적으로 종속된 상태**라고 헀다. 
그럼 위 테이블에서 이러한 상태를 찾아보자.  

* Student ID -> Name (Partial Functional Dependency)
* {Student ID, Subject ID} -> Name
* {Student ID, Subject ID} -> Grade

위 리스트는 위 테이블의 Functional Dependency를 나타낸 것인데, Student ID -> Name이 바로 Partial Functional Dependency이다.  
나머지 리스트의 Functional Dependency을 보면 Name과 Grade column은 두 후보키인 Student ID와 Subject ID에 종속되어 있지만, Name column의 경우는 Student ID만에도 종속되어 있다. 
따라서, 위 테이블에서 Name 컬럼을 삭제하므로서 Partial Functional Dependency도 제거하면서 1NF도 만족 시킬 수 있다. 

| Student ID | Subject ID | Grade |
| ---------- | ---------- | ----- |
| 1          | 1          | A+    |
| 1          | 2          | A     |
| 2          | 3          | B+    |
| 3          | 2          | B     |

## 3NF

> Trasitive Functional Dependency가 존재하는 경위 이를 제거하는 것.

각 학생의 학부와 등록금에 대한 정보가 담긴 아래와 같은 테이블이 있다.

| Student ID  | Undergraduate study | tutition |
| ----------- | ------------------- | -------- |
| 1           | Computer            | 300      |
| 2           | Mechanic            | 250      |
| 3           | Music               | 400      |

Student ID를 알면 Undergraduate study를 알 수 있고 Undergraduate study를 알면 tutition을 알 수 있다. 그리고 Student ID를 알면 tutition을 알 수 있다. 따라서 **Trasitive Functional Dependency**가 발생하고 있다. 
이렇게 **Trasitive Functional Dependency**가 발생하는 경우 A -> B를 하나의 테이블로 B -> C를 하나의 테이블로 분리해주면 된다. 
이를 제거하면 다음과 같이 두 개의 테이블로 분리할 수 있다. 

| Student ID  | Undergraduate study |
| ----------- | ------------------- |
| 1           | Computer            |
| 2           | Mechanic            |
| 3           | Music               |

| Undergraduate study ID | name     | tutition |
| ---------------------- | -------- | -------- |
| 1                      | Computer | 300      |
| 2                      | Mechanic | 250      |
| 3                      | Music    | 400      |

그런데 한가지 의문이 생길 수 있다. 앞서 Table Student를 다시 한번 살펴보자.  
다음 테이블을 보면 Student ID를 통해 

| Student ID  | Name   | Address | 
| ----------- | ------ | ------- |
| 1           | Adam   | Noida   |
| 2           | Alex   | Panipat |
| 3           | Stuart | Jammu   |
| 4           | Adam   | Noida   |

## Conclusion

Normalization이란 것은 결국 데이터의 무결성과 불필요한 중복을 막기위한 것이다.  
테이블을 설계하는 단계에서 미리 고려되지 않으면 추후 어플리케이션을 개발하고 유지보수하는 단계에서 버그를 찾고 해결하는 막대한 비용을 낭비하게 될 수 있고 한번 잘못된 테이블 설계는 추후에 수정이 더 어렵기 때문에 반드시 숙지하고 고려되어야할 것이다. 

## TODO 

* BCNF
* 실무에서 설계 단계에서 실제로 겪은 예들 추가

## Reference

* [정규화는 왜 하는 것인가?](http://asfirstalways.tistory.com/341)
* [데이터베이스 정규화 개념 및 방법](http://gomcine.tistory.com/entry/Database-9-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%A0%95%EA%B7%9C%ED%99%94-%EA%B0%9C%EB%85%90-%EB%B0%8F-%EB%B0%A9%EB%B2%95)
* [데이터베이스 정규화 1NF, 2NF, 3NF, BCNF](http://3months.tistory.com/193)
* [데이터베이스 정규화 기본 사항 설명](https://support.microsoft.com/ko-kr/help/283878/description-of-the-database-normalization-basics)
* [데이터베이스 정규화 - 이상현상 & 함수적 종속성](https://yaboong.github.io/database/2018/03/09/database-anomaly-and-functional-dependency/)