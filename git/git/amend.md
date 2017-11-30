# commit message 수정하기

commit을 했을 때 해당 commit message가 불분명하거나, 노출되면 안되는 민감한 정보가 담겨 있는 경우 해당 commit message를 수정해야하는 경우가 있을 것이다.
이러한 경우 commit message를 수정하는 방법에 대해서 알아보자.

commit message를 수정하는 경우는 보통 다음 세 가지가 존재한다.

1. Local Repository에 가장 최근에 commit된 commit message를 변경해야하는 경우.
2. Upstream에 이미 commit 된 commit message를 변경해야하는 경우.
3. 이미 commit된 여러 commit message들을 변경해야하는 경우.

## Local Repository에 가장 최근에 commit 된 commit message를 변경해야하는 경우.

이 경우 다음 명령을 통해 commit message를 수정한다.

```bash
$ git commit --amend
```

위 명령을 사용하면 git configuration의 core.editor에 설정 된 에디터가 실행되고 이를 통해 commit message를 수정할 수 있다.

예를들어, 다음과 같이 commit log가 있을 때 가장 최신의 commit message(append vs extend)를 수정해보자.

```git
* c7ad616 (HEAD -> master) test first commit
```

다음과 같이 명령 프롬프트에 명령을 입력한다.

```bash
$ git commit --amend
```

다음과 같이 편집기가 실행되면서 commit message를 수정할 수 있다.

```git
test first commit

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Wed Apr 5 23:37:43 2017 +0900
#
# On branch master
#
# Initial commit
#
# Changes to be committed:
#       new file:   test
#
~                    
```

commit message를 'Changing a commit message!'로 수정하고 저장해보자.

다시 commit log를 확인해보면 다음과 같이 commit이 추가되지 않고 기존의 메시지가 변경된 것을 확인할 수 있다.

```git
* 92b7a70 (HEAD -> master) Changing a commit message!
```

한가지 흥미로운 사실은 commit id가 c7ad616에서 92b7a70으로 변경된 것이다.

Git은 commit message도 하나의 commit으로 간주하기 때문에 commit message를 변경하였을 때 commit id 역시 함께 변경한다.

## 참조

* [Changing a commit message](https://help.github.com/articles/changing-a-commit-message/)
