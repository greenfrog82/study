# Terminator에 대해서 그리고 간단히 설정하기 

## 소개

이직한 회사에서 개발 환경을 우분투를 사용하고 있다. 따라서, 터미널을 이용할 떄가 많은데 회사분이 [Terminator](https://en.wikipedia.org/wiki/Terminator_(terminal_emulator))라는 터미널 에뮬레이터를 소개해주셔서 사용하고 있다. 
화면을 분할하여 사용하거나 탭을 만들어서 사용하는것 이외에도 많은 기능이 있다고 하는데 아직 사용해 보지는 않았다. 다음은 [Terminator](https://gnometerminator.blogspot.kr/) 공식 사이트에 소개 된 내용이다. 

> Features:
>
>* Arrange terminals in a grid
 * Tabs
 * Drag and drop re-ordering of terminals
 * Lots of keyboard shortcuts
 * Save multiple layouts and profiles via GUI preferences editor
 * Simultaneous typing to arbitrary groups of terminals
 * and lots more...

## 단축키

* Ctrl + Alt + T : 바탕화면에서 터미널 실행
* Ctrl + Shift + T : 터미널내에서 새탭으로 터미널을 실행
* Ctrl + Page Down : 터미널내에서 다음 탭으로 이동
* Ctrl + Page Up : 터미널내에서 이전 탭으로 이동
* Ctrl + Shift + N : 터미널내에서 화면이 분할 되었을 때, 다음 분할 화면으로 이동
* Ctrl + Shift + P : 터미널내에서 화면이 분할 되었을 때, 이전 분할 화면으로 이동
* Ctrl + Shift + W : 터미널내에서 실행된 터미널을 종료
* Ctrl + Shift + Q : 현재 터미널을 종료(탭포함)
* Ctrl + Shift + E : 터미널내에서 화면 수직 분할
* Ctrl + Shift + O : 터미널내에서 화면을 수평 분할

## 설정

아직 다음 설정 내용의 의미는 정확히 모른다. 관련 내용은 회사에 적은한 후 차차 찾아서 적도록 하고 일단 지금은 font설정만 내가 사용하고 있는 [D2Coding](https://github.com/naver/d2codingfont)으로 변경해서 사용하고 있다. 

```
[global_config]
  tab_position = bottom
  handle_size = 0
  focus = system
[keybindings]
[profiles]
  [[default]]
    scrollbar_position = hidden
    use_system_font = False
    background_darkness = 0.8
    background_type = transparent
    background_image = None
    show_titlebar = False
    font = 나눔고딕코딩 Bold 10
[layouts]
  [[default]]
    [[[child1]]]
      type = Terminal
      parent = window0
    [[[window0]]]
      type = Window
      parent = ""
      size = 1000, 600
[plugins]
```

## 참조

* [[Linux] Ubuntu Gnome 터미널 추천 - Terminator](http://programmingsummaries.tistory.com/361)
* [Terminator](https://gnometerminator.blogspot.kr/)
*

