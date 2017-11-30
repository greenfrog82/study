# 특정 디렉토리와 해당 디렉토리의 모든 하위 디렉토리의 특정 파일 모두 지우기

다음과 같은 경로가 존재할 때, 모든 하위디렉토리에 존재하는 *.backup 확장자를 갖는 파일을 지워야한다.

```bash
$ tree
.
├── develop
│   ├── nodejs
│   │   ├── b.backup
│   │   ├── docs
│   │   │   └── c.backup
│   │   └── src
│   │       └── a.backup
│   └── python
└── docs
    └── d.backup

6 directories, 4 files
```

find명령을 사용하면, 이러한 상황에서 쉽게 원하는 파일을 삭제할 수 있다.

우선, 다음 명령을 사용하면 특정 디렉토리의 모든 하위 디렉토리를 뒤져서 삭제하고자 하는 파일들의 목록을 나열할 수 있다.

```bash
$ find <target directory> -name <file name> -type f
```

위 명령을 사용해서, target directory에서 확장자가 *.backup으로 되어 있는 파일이 목록을 출력해보자.

```bash
$ find . -name *.backup -type f
./develop/nodejs/b.backup
./develop/nodejs/docs/c.backup
./develop/nodejs/src/a.backup
./docs/d.backup
```

삭제하고자 하는 모든 파일들이 출력되었다. 파일을 삭제하기 전에 이렇게 한번 확인하는 절차를 거치는 것은 아주 중요하다.
그럼, 삭제하고자 하는 파일들을 실제로 삭제하려면 어떻게 해야할까? 앞서 사용한 명령의 가장 마지막에 -delete 명령을 추가해주기만 하면된다.

명령은 다음과 같다.

```bash
$ find . -name <target directory> -name <file name> -type f -delete
```

위 명령을 사용해서, 이번에는 실제로 파일들을 삭제해보자.

```bash
$ find . -name *.backup -type f -delete
```

```bash
$ find . -name *.backup -type f -delete
$ tree
.
├── develop
│   ├── nodejs
│   │   ├── docs
│   │   └── src
│   └── python
└── docs

6 directories, 0 files
```

삭제하고자 했던 *.backup 파일들이 모두 삭제된 것을 확인할 수 있다.

## 참조

* [How can I recursively delete all files of a specific extension in the current directory?](https://askubuntu.com/questions/377438/how-can-i-recursively-delete-all-files-of-a-specific-extension-in-the-current-di)
