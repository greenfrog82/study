# External file changes sync may be slow

## 문제

pycharm을 사용 중 다음과 같은 경고 메시지가 출력되었다. 

![external file change sync may be slow](external_file_changes_sync_may_be_slow.png)

## 해결

위 경고 메시지에서 show detail 링크를 클릭하면 [Inotify Watches Limit](https://confluence.jetbrains.com/display/IDEADEV/Inotify+Watches+Limit)로 이동한다. 해당 문서를 읽어보면 다음과 같은 절차를 통해 문제를 해결하라고 나와있다.

1. /etc/sysctl.conf에 다음 라인을 추가하여라. 이때, 설정해주는 값을 약 52kb를 설정하였는데 상황에 따라 더 큰값을 전달하도록 한다.

> fs.inotify.max_user_watches = 524288

2. 위 변경사항을 저장한 후 다음 명령을 수행하고 IDE를 재시작한다.

> $ sudo sysctl -p --system

나의 경우 위 내용대로 따라해보았지만 변경내용이 반영되지 않아 컴퓨터를 재부팅하니 변경내용이 적용되었다. 

**주의**

설정한 watches limit은 로그인 된 사용자계정에 의존한다. 즉, A라는 사용자가 위 설정을 했다고 해서 이 설정이 다른 사용자에게도 영향을 주는 것이 아니다. 또한, 해당계정에서 inotify를 이용해서 파일의 변화를 감시하는 모든 프로그램이 이 설정을 공유하므로 설정값이 작은 경우는 더 큰값을 사용해야한다. 

## 참조

* [21. Inotify support on Linux (instantaneous reports, no I/O load)](http://www.la-samhna.de/samhain/manual/finotify.html)
* [Inotify Watches Limit](https://confluence.jetbrains.com/display/IDEADEV/Inotify+Watches+Limit)
