# [youtube-dl](https://rg3.github.io/youtube-dl/)

Youtube 또는 [more sites](https://rg3.github.io/youtube-dl/supportedsites.html)의 동영상을 다운로드 받을 수 있게 해주는 라이브러리이다. Python 2.6, 2.7 그리고 3.2 이상 버전에서 동작하며 Unix, Linux, Mac OS X, Windows에서 동작한다.  

본 문서에서는 Ubunut 16.4와 Python3.6으로 설명을 진행한다.  

## Installing youtube-dl

```bash
$ sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
$ sudo chmod a+rx /usr/local/bin/youtube-dl
```

## Downloading Youtube Content

`youtube-dl`은 엄청나게 많은 옵션을 제공하지만, 다음과 같이 다운받고자 하는 URL을 넣어주면 해당 URL의 동영상을 간단히 다운로드 받을 수 있다.  

```bash
$ youtube-dl url
```

## Downloading Youtube Play List 

Youtube에서 특정 Play List가 있다면 Play List의 동영상들을 다움로드 받을 수도 있다.  
이때 사용될 수 있는 옵션들이 있는데, 일단 다음 옵션들에 대해서 알아보자.   

* --playlist-start NUMBER Playlist video to start at (default is 1)
* --playlist-end NUMBER Playlist video to end at (default is last)

Youtube에서 다운받고자하는 Play List를 선택 한 후 위 두 옵션을 통해 다운로드 받고자하는 동영상의 범위를 정해주면 된다. 이때 해당 옵션들을 전달하지 않으면 Play List의 모든 동여상이 다운로드 된다.   

```bash
$ youtube-dl --playlist-start NUMBER --playlist-end NUMBER play_list_url
```