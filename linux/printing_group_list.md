# How to print group list

리눅스에서 현재 사용자가 속한 group 목록과 시스템의 전체 group 목록을 출력하는 방법에 대해서 알아보자. 

#### Requirement

* Ubuntu Linux 17.10
 
## Printing group list of current user

다음 명령을 통해 현재 사용자가 등록되어 있는 group 목록을 출력할 수 있다. 

> $ groups 

## Printing group list of all users

시스템의 모든 group 목록은 /etc/group 파일에 저장되어 있다. 
해당 파일을 그냥 열어서 확인 할 수도 있고 다음 명령을 통해 group name만 출력할 수도 있다. 

> $ cut -d: -f1 /etc/group

위 명령과 함께 다음과 같이 grep을 이용해서 특정 group이 존재하는지 검색 할 수도 있다. 

> $ cut -d: -f1 /etc/group | grep [specific group name]

## Reference

* [Is there a command to list all Unix group names? [closed]
](https://stackoverflow.com/questions/14059916/is-there-a-command-to-list-all-unix-group-names)