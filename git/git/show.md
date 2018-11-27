# [show](https://git-scm.com/docs/git-show)

다음 명령은 특정 commit에 대한 다양한 정보를 출력한다.  

>git show [options] [sha1]

## Example

```bash
$ git log --oneline
66b8ae5 (HEAD -> master, origin/master, origin/HEAD) Merge branch 'master' of https://github.com/greenfrog82/study
552826a Mac - find command
f4c6eb1 Merge branch 'master' of https://github.com/greenfrog82/study
cded78b Mac iTerm - Sync input multiple pane
b4a7008 Mac lsof - How to find process which using specific port.
d8cfd16 Mac netstat - describe come options(-p, -v)
fb8d3fa Mac netstat - describe some options(-a, -n) and how to find process using specific port
d44a92a Mac netstat - describe some options(-a, -n) and how to find process using specific port
7e1920f Github - How to use the Github for collaborate project
e580604 move python study data from here to TIL_Python
591eb5c Python Django - 7. Queries And The DataBase Layer
0674d2e Python Django - 7. Queries And The DataBase Layer
831e914 Python Django - 6. Model Best Practice, Third time
4d2eee4 Python Regex Utilize - How to remove brace, -, _ and make new string
a0831a8 Python Django QuerySet.exists()
```

위 커밋들 중에 '66b8ae5'의 정보를 확인해보자. 

```bash
$ git show 66b8ae5
commit 66b8ae5a2dce0330c6978ca4232d7272fee5a555 (HEAD -> master, origin/master, origin/HEAD)
Merge: 552826a f4c6eb1
Author: greenfrog <greenfrog82@naver.com>
Date:   Wed Nov 14 23:54:25 2018 +0900

    Merge branch 'master' of https://github.com/greenfrog82/study
```