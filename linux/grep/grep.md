# grep (globally search a reqular expression and search)

grep은 일반 텍스트에서 regular exrepssion에 일치하는 line을 검색해주는 command line 툴이다.
여기서 일반 텍스트는 file 또는 stream 등에 존재하는 모든 문자열을 말한다.

본 문서에서는 grep을 통해 유용하게 사용할 수 있는 기능에 대해서 정리하기로 한다.
다음은 본 문서의 예제에서 사용하기 위한 문서이다.

[sample.txt]('./sample.txt')
```bash
[DEBUG][2017-08-21] test_1
[DEBUG][2017-08-22] test_2
[INFO][2017-08-23] test_3
[WARN][2017-09-01] test_4
[INFO][2017-09-02] test_5
[INFO][2017-09-03] test_6
[ERR][2017-09-29] test_7
[ERR][2017-09-30] test_8
```

## 특정 단어를 포함하지 않는 라인 검색하기

> -v, --invert-match
             Selected lines are those not matching any of the specified patterns.

-v 옵션을 사용하면 특정 단어를 포함하지 않는 라인을 검색할 수 있다. 형식은 다음과 같다.

> grep -v ['unwanted word'] [file path]

### 예제

DEBUG 문자를 제외한 라인만 검색해보자.

```bash
$ grep -v 'DEBUG' sample.txt
[INFO][2017-08-23] test_3
[WARN][2017-09-01] test_4
[INFO][2017-09-02] test_5
[INFO][2017-09-03] test_6
[ERR][2017-09-29] test_7
[ERR][2017-09-30] test_8
```

## OR 연산자 사용하기

> -E, --extended-regexp
             Interpret pattern as an extended regular expression (i.e. force grep to behave as egrep).

grep에서 기본적으로 제공하지 않는 기능 사용하기 위한 옵션이다.
OR 연산의 경우 grep의 기본 기능으로 제공하지 않기 때문에 -E 연산자를 사용해야한다.
OR 연산을 하는 형식은 다음과 같다.

> grep -E 'A'|'B' [file path]

### 예제

DEBUG 또는 INFO를 포함하고 있는 라인들만 검색해보자.

```bash
$ grep -E 'DEBUG'|'INFO' sample.txt
[DEBUG][2017-08-21] test_1
[DEBUG][2017-08-22] test_2
[INFO][2017-08-23] test_3
[INFO][2017-09-02] test_5
[INFO][2017-09-03] test_6
```

## Reference

* [grep](https://en.wikipedia.org/wiki/Grep)
* [How can I exclude one word with grep?](https://stackoverflow.com/questions/4538253/how-can-i-exclude-one-word-with-grep)
* [grep 사용법](http://damul21c.tistory.com/95)
* [grep without showing path/file:line](https://stackoverflow.com/questions/19406761/grep-without-showing-path-fileline)
* [Unix/Linux 문자열 패턴 검색 (grep)](http://ra2kstar.tistory.com/100)
