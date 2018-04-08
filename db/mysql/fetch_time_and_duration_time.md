# What is the fetch and duration time?

MySQL Workbench를 사용하다 보면 쿼리를 수행한 후 Duration/Fetch Time이 표시되데 어떤 차이가 있는지 알아보았다.

## Duration

쿼리가 데이터베이스 서버에서 실행되는 시간이다. 따라서, 우리가 개발한 쿼리의 성능을 최적화 하기 위해서느냐 이 시간을 최소화해야한다. 

## Fetch time

쿼리가 데이터베이스 서버에서 싱행된 후 쿼리를 요청한 클라이언트로 쿼리 결과를 전달하는데 걸리는 시간이다.  
이 시간의 경우는 개발자가 개발한 쿼리의 성능과는 무관하다. 따라서 이 경우에는 네트워크의 문제로서 개발에서 최적화 할 수 부분이 아니다. 

## Reference

* [mysql duration and fetch time
](https://stackoverflow.com/questions/9425134/mysql-duration-and-fetch-time)