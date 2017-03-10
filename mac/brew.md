# Homebrew를 사용해서 패키지 관리하기

## 작성 환경

> macOS Sierra version 10.12.13

## 개요

Mac에도 데비안 계열의 apt-get이나 레드햇 계열의 yum과 같은 패키지 메니저가 존재한다. Mac에서는 패키지 메니저로 [Homebrew](https://brew.sh/)와 [Homebrew Cask](https://github.com/caskroom/homebrew-cask) 사용한다.

[Homebrew](https://brew.sh/)는 UNIX 기반의 툴들과 Mac OS에서 동작하는 오픈소스 어플리케이션을 관리하는 역할을 한다. 
반면에 [Homebrew Cask](https://github.com/caskroom/homebrew-cask)는 Mac OS의 윈도우 어플리케이션을 관리하는 역할을 한다. 


## Homebrew 설치하기

Homebrew를 설치하기 위해서는 먼저 Xcode를 위한 command-line 툴을 설치해야한다. 다음 명령을 통해 설치하도록 하자.

```
xcode-select --install
```

위 과정을 마치면, 이제[Homebrew](https://brew.sh/)를 설치할 차례다. 다음 명령을 통해 설치하도록한다. 다음 명령을 사용하면[Homebrew](https://brew.sh/)를 설치하고 [Homebrew](https://brew.sh/)를 통해 프로그램을 설치할 때 sudo 명령과 password를 입력하지 않아도 되도록 설정한다 

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```


## 참조

* [Homebrew](https://brew.sh/)
* [Homebrew Cask](https://github.com/caskroom/homebrew-cask) 
* [How to install Packages with Homebrew for OS X](https://www.howtogeek.com/211541/homebrew-for-os-x-easily-installs-desktop-apps-and-terminal-utilities/)
