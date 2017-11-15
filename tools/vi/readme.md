# vi 기본 사용법

## 이동

* j - 한 칸 아래로 이동
* k - 한 칸 위로 이동
* h - 한 칸 왼쪽으로 이동
* l - 한 칸 오른쪽으로 이동
* w - 한 단어만큼 오른쪽으로 이동
* b - 한 단어만큼 왼쪽으로 이동
* 0 - 현재 줄의 시작지점으로 이동
* $ - 현재 줄의 끝지점으로 이동
* gg - 파일의 맨 첫줄로 이동
* G - 파일의 맨 끝으로 이동
* Ctrl + b - Page Up
* Ctrl + f - Page Down
* Ctrl + u - Page Half Up
* Ctrl + d - Page Half Down
* :n - n번째 줄로 이동한다.

## 입력

* i - 현재 커서 위치에서부터 입력
* a - 현재 커서 위치 다음 글자부터 텍스트 입력
* o - 현재 커서의 바로 다음에 새 줄을 추가하고 다음줄에서 바로 삽입모드 전환
* O - 현재 커서의 윗줄에 새 줄을 추가하고 윗줄에서 바로 삽입모드 전환

## 삭제

* x - 커서가 위치한 곳의 한글자를 지운다.
* d + h - 커서가 위치한 곳에서 한칸 앞쪽의 한글자를 지운다.
* d + j - 현재줄을 포함하여 다음 줄까지 2줄을 지우게 된다.
* d + d - 현재 줄을 지운다.

## 복사 & 붙여넣기

아래 설명은 명령 모드에서 이루어져야한다.

1. 'v'문자를 통해서 visual mode로 진입한다. (블록 모드)
2. 이 상태에서 복사하고자 하는 범위를 지정한다.
3. 'y'문자를 통해서 복사를 수행한다.
4. 복사 된 내용을 붙여넣을 장소로 이동한다.
5. 'p'문자를 통해서 붙여넣기를 수행한다.

## 선택하기

* v - 글자 단위 선택하기
* V - 줄 단위 선택하기
* Ctrl + v - 컬럼 선택하기
* Shift + v + g - 현재 커서의 줄부터 마지막 줄까지 모두 선택하기
* ggVG - 문서의 모든 내용 선택하기

## Undo / Redo

* u - 모든 편집 영역에 대한 Undo 처리 수행
* U - 현재 편집 중인 줄에 대한 Undo 처리 수행
* Ctrl + r - 모든 편집 영역에 대한 Redo 처리 수행

## Column Mode

1. Column Mode를 설정하고자 하는 행으로 이동한다.
2. Ctrl + v를 눌러 Column Mode로 진입한다.
3. 화살표를 이용해서 편집하고자 하는 행을 선택한다.
4. Shift + i를 눌러 편집 모드로 진입한다.
5. 편집하고자 하는 내용을 작성한다. 이때, 주의해야할 것은 선택한 모든 행에 내용이 작성되지 않는다는 것이다. 일단, 신경쓰지 말고 내용을 작성하자.
6. esc 키를 두 번 누르면 앞서 편집했던 내용이 선택했던 행에 모두 반영된다.

## Navigation

:e 명령을 사용하여 에디터 안에서 파일 시스템의 디렉토리 구조를 네비게이션 할 수 있다.
:e 명령은 vi 명령을 실행한 위치를 현재경로로 인식하여 동작한다.

* e . - 현재 경로를 네비게이션한다.
* e .. - 부모 경로를 네비게이션한다.

## Replace

**옵션**

* 'i' 옵션을 주지 않는 한 기본 옵션으로 대소문자를 구분하여 변경한다.
* 'g' 옵션은 검색되는 모든 대상에 대해서 변경을 수행하겠다는 것으로, 이 옵션을 주지 않으면 검색되는 첫번째 대상에 대해서만 변경을 수행한다.
* 'c' 옵션은 변경을 수행할 때 사용자에게 확인을 받는 절차를 거친다.
* 's' 옵션은 현재 줄을 대상으로 검색 및 변경을 수행한다.
* '%s' 옵션은 문서 전체에 대해서 검색 및 변경을 수행한다.

**예제**

* s/foo/bar/g - 현재 있는 줄의 모든 foo를 bar로 변경한다.  
* %s/foo/bar/g - 문서 전체에서 모든 foo를 bar로 변경한다.
* %s/foo/bar/gc - 문서 전체에서 모든 foo를 bar로 변경하기 전 확인 절차를 거친다.
* %s/\<foo\>/bar/gc - 문서 전체에 대해서 foo와 완전히 일치되는 경우에만 bar로 변경한다.
* %s/foo/bar/gci or %s/foo\c/bar/g - 문서 전체에 대해서 foo를 대소문자 구분없이 검색한 후 변경하기 전 확인 절차를 거친다.
* %s/foo/bar/gcI or %s/foo\C/bar/g - 문서 전체에 대해서 foo를 대소문자 구분하여 검색한 후 변경하기 전 확인 절차를 거친다.

## 참조

* [vi 기본 사용법](http://soooprmx.com/wp/archives/2777)
* [Vim Vi 블록 선택, 복사, 붙이기, 칼럼 영역 선택하기; Select Copy Paste](http://mwultong.blogspot.com/2006/11/vim-vi-select-copy-paste.html)
* [vi 편집기에서 세로 모드 (column mode) 로 문자열 입력](http://starblood.tistory.com/entry/vi-%ED%8E%B8%EC%A7%91%EA%B8%B0%EC%97%90%EC%84%9C-%EC%84%B8%EB%A1%9C-%EB%AA%A8%EB%93%9C-column-mode-%EB%A1%9C-%EB%AC%B8%EC%9E%90%EC%97%B4-%EC%9E%85%EB%A0%A5)
* [All the right moves](http://vim.wikia.com/wiki/All_the_right_moves)
* [Fast Select All](http://dailyvim.blogspot.kr/2007/11/fast-select-all.html)
* [Search and replace](http://vim.wikia.com/wiki/Search_and_replace)
* [VIM Editor Commands](http://www.radford.edu/~mhtay/CPSC120/VIM_Editor_Commands.htm)
