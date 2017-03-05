# SSH를 이용해서 GiSSH를 이용해서 GitHub에 사용자 인증하기tHub에 사용자 인증하기 

## 개요

인증이 되지 않은 컴퓨터를 이용해서 작업을 하고 코드를 GitHub에 올리려고 하면 ID/PW를 입력하는 화면이 나타난다.
이렇게 ID/PW 방식의 인증방식을 사용하지 않고 SSH를 이용하면 보안성도 높이고 ID/PW를 입력하는 불편함도 없앨 수 있다. 

SSH를 이용해서 GitHub에 인증하는 방법에 대해서 알아보자. 

## Generating a new SSH key

SSH key를 생성해야한다. 다음 절차를 통해 SSH key를 생성한다. 

```
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

위 명령을 수행하면 다음과 같이 공개키와 비밀키를 RSA 알고리즘을 통해서 생성한다.
이떄, 생서오디는 공개키와 비밀키를 어디에 저장할 것인지 물어본데, 안내하는 경로가 아닌 다른 경로에 저장하고 싶다면, 다른 경로를 입력하고 그렇지 않으면 그냥 Enter를 입력한다.

```
Generating public/private rsa key pair.
Enter file in which to save the key (/home/jaeyoungcho/.ssh/id_rsa):
```

다음은 만들어진 비밀키를 통해 인증을 할 때, 사용할 비밀번호를 입력한다. 여기서 비밀번호를 입력하면 GitHub으로 Push를 할 떄 매번 해당 비밀번호를 입력할 것을 묻게 된다. 굳이 입력하지 않아도 되지만, 다음 상황을 고려해서 비밀번호를 설정해 둔다면 좀 더 높은 수준의 보안이 가능한다. 

예를들어, 자신의 PC를 다른 사람이 로그인해서 사용할 수 있다고 하자. 이와 같은 경우, 비밀키에 대한 비밀번호를 설정하지 않는다면, 자신의 PC에 로그인 한 다른 사용자는 비밀키를 통해 인증하는 GitHub 계정에 대한 액세스가 가능해진다. 히지만, 비밀키에 대한 비밀번호를 설정해 두었다면, 이를 알아내지 못하는 한 해당 비밀키를 통해 인증하는 GitHub 계정에 대한 인증은 불가능하다. 

물론, 뒤에 설명할 ssh-agent를 이용하면 비밀키에 대한 비밀번호를 인증 시 매번 이력하지 않고 한번만 입력하면 된다고 한다. 하지만 이렇게 되면 앞서 설명한 비밀키에 대한 비밀번호를 입력하는 의미가 사라지는데 왜 ssh-agent를 통해 비밀키를 관리하는지는 아직 명확히 이해가 되지 않는다. 

비밀키에 대한 비밀번호는 다음 과정을 통해 설정한다. 

```
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
```

여기까지 과정을 마쳤다면 다음과 같은 메시지와 함께 공개키와 비밀키 생성이 완료된다.

```
Your identification has been saved in /home/jaeyoungcho/.ssh/id_rsa.
Your public key has been saved in /home/jaeyoungcho/.ssh/id_rsa.pub.
The key fingerprint is:
0d:5f:a8:54:91:b3:5f:99:db:61:ed:6b:7a:a6:ab:bb greenfrog82@naver.com
The key's randomart image is:
+--[ RSA 4096]----+
|          oo     |
|         .o.     |
|        o .o.  o.|
|       . =..  +o.|
|        S o. ..+.|
|            . . o|
|                .|
|               = |
|           E++B  |
+-----------------+
```

## Adding your SSH key to ssh-agent

ssh-agent는 SSH key를 관리해주는 프로그램인데 자세한 내용은 다음 기회에 정리하기로 하고, 다음 절차를 따라 ssh-agent에 앞서 생성한 SSH key를 추가해주도록 하자. 

다음 명령을 통해서 ssh-agent를 background로 실행 시킨다.

```
$ ~/.ssh$ ssh-agent -s
SSH_AUTH_SOCK=/tmp/ssh-L2ItpsYzuyXY/agent.10884; export SSH_AUTH_SOCK;
SSH_AGENT_PID=10885; export SSH_AGENT_PID;
echo Agent pid 10885;
```
다음 명령을 통해서 ssh-agent에 방금 생성한 SSH key를 추가한다.

```
$ ssd-add <SSH key path>
```


## Adding a new SSH key to your GitHub account

이제 생성한 공개키를 자신의 GitHub 게정에 추가해보자. 

1. 앞서 생성한 공개키를 text editor로 열어서 clip board에 복사한다.
2. 자신의 GitHub 계정으로 이동해서 우상단의 사진을 클릭한 후 출력되는 메뉴에서 **Settings**를 선택한다. 
3. GitHub 계정에 대한 설정을 하는 메뉴가 출력된다. 좌측 메뉴에서 **SSH and GPG Keys** 메뉴를 선택한다. 
4. SSH Keys 화면의 우측에 있는 **New SSH Key** 버튼을 클릭한다. SSH Key(여기서 이야기하는 SSH Key는 앞서 생성한 공개키를 이야기한다. 따라서 혼동되지 않도록 이하 공개키라고 표현한다.) 를 등록하는 화면이 출력된다.
5. Title filed에는 등록하고자 하는 공개키를 설명할 수 있는 간단한 이름을 적는다. 나의 경우, Ubuntu를 사용하는 laptop을 인증할 공개키이이므로 'ubuntu laptop'이라고 작성했다. 
Keky filed에는 앞서 clip board에 복사한 공개키를 붙여넣기한다. 
6. **Add SSH Key** 버튼을 클릭한다.
7. GitHub의 PW를 입력하는 화면이 나타난다. PW를 입력하면 모든 과정이 완료된다. 


# 참고

* [Generating a new SSH key and adding it to the ssh-agent](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
* [Adding a new SSH key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)
* [Working with SSH key passphrases](https://help.github.com/articles/working-with-ssh-key-passphrases/)
* [what's the purpose of ssh-agent?](http://unix.stackexchange.com/questions/72552/whats-the-purpose-of-ssh-agent)

