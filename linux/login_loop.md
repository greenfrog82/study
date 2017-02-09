# login loop 해결하기

## 문제

docker에서 Ubuntu:14.04 이미지를 통해 컨테이너를 하나 만든 후 해당 컨테이너에서 X-Window를 띄울 수 있을까해서 다음 명령을 실행하였다. 

```
sudo startx
```

이후 화면이 이상해져서 재부팅을 하고 로그인을 하려는데 비밀번호를 입력하면 다시 로그인화면이 나오고 다시 비밀번호를 입력하면 다시 로그인 화면이 나오는 현상이 계속해서 반복되었다. 

## 해결

로그인 화면에서 Ctrl + Alt + F1을 통해 Shell 화면으로 이동한다. 

그리고 ls -lA 명령을 입력한 후 출력되는 내용이 다음과 같은지 확인한다.

> -rw-------    1 root root 53 Nov 29 10:19 .Xauthority

만약, 위와 같다면 다음명령을 실행하고 다시 로그인을 시도한다. 

> chown <username>:<username> .Xauthority

이제 해결 되었다. 

## 원인

.Xauthroity는 각각 사용자의 Home 디렉토리에 위치한다. 이 파일은 X 세션의 인증을 위해 xauth에서 사용되는 쿠키에 자격 증명을 저장하기 위해서 사용되며,
X 세션이 시작되었을 때, 이 쿠키는 특정 화면과의 연결을 인증하기 위해서 사용된다. 

따라서, 만약 로그인 하고자 하는 사용자가 이 파일을 소유하고 있지 않다면 위와 같은 경우(root가 .Xauthority의 소유자였다.) 로그인 정보를 입력한다 하더라고
.Xauthroity에 사용자 인증 정보를 저장하지 못하므로 login loop에 빠진것이다. 

위와 같이 처리하면 해결이 되는 이유는 .Xauthority가 root 권한으로 있었던 것을 다시 사용자 권한으로 돌려놨기 때문인데, 

## 참조

* [Ubuntu gets stuck in a login loop](http://askubuntu.com/questions/223501/ubuntu-gets-stuck-in-a-login-loop)
* [What represent. Xauthority file?](http://askubuntu.com/questions/300682/what-represent-xauthority-file)