# Homebrew를 사용해서 패키지 관리하기

## 작성 환경

> macOS Sierra version 10.12.13

## 개요

Mac에도 데비안 계열의 apt-get이나 레드햇 계열의 yum과 같은 패키지 메니저가 존재한다. Mac에서는 패키지 메니저로 [Homebrew](https://brew.sh/)와 [Homebrew Cask](https://github.com/caskroom/homebrew-cask) 사용한다.

[Homebrew](https://brew.sh/)는 UNIX 기반의 툴들과 Mac OS에서 동작하는 오픈소스 어플리케이션을 관리하는 역할을 한다. 
반면에 [Homebrew Cask](https://github.com/caskroom/homebrew-cask)는 Mac OS의 윈도우 어플리케이션을 관리하는 역할을 한다. 


## [Homebrew](https://brew.sh/) 설치하기

Homebrew를 설치하기 위해서는 먼저 Xcode를 위한 command-line 툴을 설치해야한다. 다음 명령을 통해 설치하도록 하자.

```
xcode-select --install
```

위 과정을 마치면, 이제[Homebrew](https://brew.sh/)를 설치할 차례다. 다음 명령을 통해 설치하도록한다. 다음 명령을 사용하면[Homebrew](https://brew.sh/)를 설치하고 [Homebrew](https://brew.sh/)를 통해 프로그램을 설치할 때 sudo 명령과 password를 입력하지 않아도 되도록 설정한다 

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

설치를 모두 마쳤으면, [Homebrew](https://brew.sh/)가 정상적으로 설치되었는지 확인해보자. 

```
brew doctor
```

doctor는[Homebrew](https://brew.sh/)에 어떤 문제가 있는지 점검하는 옵션이다. 다음과 같은 메시지가 출력되면 정상적으로 설치되어 동작할 준비가 된 것이다. 

```
Your system is ready to brew.
```

## [Homebrew Cask](https://github.com/caskroom/homebrew-cask)

[Homebrew Cask](https://github.com/caskroom/homebrew-cask)는반드시[Homebrew](https://brew.sh/)가 설치되어 있어야하므로 앞선 과정이 완료된 후 설치하도록 주의하자.

다음 명령을 통해 설치하도록 하자.

```
brew install caskroom/cask/brew-cask
```

[How to install Packages with Homebrew for OS X](https://www.howtogeek.com/211541/homebrew-for-os-x-easily-installs-desktop-apps-and-terminal-utilities/)의 설명데로라면 설치가 정상적으로 되어야하지만 나의 경우 다음과 같은 메시지가 출력되었다. 

```
Updating Homebrew...
==> brew cask install caskroom/cask/brew-cask
Error: Tap caskroom/cask already tapped.

Follow the instructions here:
  https://github.com/caskroom/homebrew-cask/blob/master/doc/reporting_bugs/pre_bug_report.md

If this doesn’t fix the problem, please report this bug:
  https://github.com/caskroom/homebrew-cask#reporting-bugs

/usr/local/Homebrew/Library/Homebrew/tap.rb:196:in `install'
/usr/local/Homebrew/Library/Homebrew/cask/lib/hbc/source/untapped_qualified.rb:9:in `me?'
/usr/local/Homebrew/Library/Homebrew/cask/lib/hbc/source.rb:28:in `block in for_query'
/usr/local/Homebrew/Library/Homebrew/cask/lib/hbc/source.rb:26:in `each'
/usr/local/Homebrew/Library/Homebrew/cask/lib/hbc/source.rb:26:in `find'
/usr/local/Homebrew/Library/Homebrew/cask/lib/hbc/source.rb:26:in `for_query'
/usr/local/Homebrew/Library/Homebrew/cask/lib/hbc.rb:56:in `load'
/usr/local/Homebrew/Library/Homebrew/cask/lib/hbc/cli/install.rb:21:in `block in install_casks'
/usr/local/Homebrew/Library/Homebrew/cask/lib/hbc/cli/install.rb:19:in `each'
/usr/local/Homebrew/Library/Homebrew/cask/lib/hbc/cli/install.rb:19:in `install_casks'
/usr/local/Homebrew/Library/Homebrew/cask/lib/hbc/cli/install.rb:10:in `run'
/usr/local/Homebrew/Library/Homebrew/cask/lib/hbc/cli.rb:101:in `run_command'
/usr/local/Homebrew/Library/Homebrew/cask/lib/hbc/cli.rb:144:in `process'
/usr/local/Homebrew/Library/Homebrew/cmd/cask.rb:8:in `cask'
/usr/local/Homebrew/Library/Homebrew/brew.rb:91:in `<main>' 
```

문제를 확인해보니 이미[Homebrew Cask](https://github.com/caskroom/homebrew-cask)가 설치되어 있었다. 

## [Homebrew](https://brew.sh/) 사용법

### 검색하기

Repository에서 설치하고자 하는 패키지를 검색한다. 

```
brew search <package name>
```

### 설치하기

Repository에서 패키지를 다운로드하고 설치한다. 

```
brew install <package name>
```

### 삭제하기

local machine에 설치 된 패키지를 삭제한다. 

```
brew uninstall <package name>
```

## [Homebrew Cask](https://github.com/caskroom/homebrew-cask) 사용법

### 검색하기

Repository에서 설치하고자 하는 패키지를 검색한다. 

```
brew cask search <package name>
```

### 설치하기

Repository에서 패키지를 다운로드하고 설치한다. 

```
brew cask install <package name>
```

### 삭제하기

local machine에 설치 된 패키지를 삭제한다. 

```
brew cask uninstall <package name>
```

### 설치하기


### 삭제하기

### 검색하기



## 참조

* [Homebrew](https://brew.sh/)
* [Homebrew Cask](https://github.com/caskroom/homebrew-cask) 
* [How to install Packages with Homebrew for OS X](https://www.howtogeek.com/211541/homebrew-for-os-x-easily-installs-desktop-apps-and-terminal-utilities/)
