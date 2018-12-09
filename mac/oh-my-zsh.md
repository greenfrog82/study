# [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

`oh-my-zsh`은 `zsh`을 쉽게 설정하기 위한 프레임워크 중 하나이다.  
본 문서에서는 맥에서 `zsh`을 설저하고, `oh-my-zsh`을 설치하고 설정하는 방법에 대해서 알아보자.  

## Installing zsh

다음 명령을 통해 `zsh`을 설치하자. 

>$ brew install zsh

## Installing Oh-My-Zsh

다음 명령을 통해 `oh-my-zsh`을 설치하자. 

>$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

위 명령을 수행하면 `zsh`을 default shell로 설정해준다. 만약 설정이 안된다면 다음 명령을 이용해서 `zsh`을 default shell로 바꿔주자.  

>$ chsh -s $(which zsh)

## Applying Configuration

위 명령을 실행한 후 터미널을 새로 시작하면 `~/.zshrc`가 적용되지만, 현재 터미널에서 `~/.zshrc`을 적용하기 위해서는 다음 명령을 실행하자.

>$ source ~/.zshrc

## Adding Useful Plugins

`zsh`에서 사용할 플러그인들을 `~/.zshrc`에 반영해보자. `vim`으로 `~/.zshrc`을 연 후, `plugins`키에 사용하고자 하는 `plugin`이름을 나열해주면 된다.  
```zsh
# Which plugins would you like to load?
# Standard plugins can be found in ~/.oh-my-zsh/plugins/*
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
  git colored-man colorize pip python brew osx zsh-syntax-highlighting
)
```

## Applying Themes

`zsh`의 테마를 변경해보자. [agnoster](https://github.com/agnoster/agnoster-zsh-theme) 테마를 사용할 것이다. 
우선 다음과 같이 `vim`으로 `~/zshrc`을 연 후, `ZSH_THEME`키에 `agnoster`를 설정해준다. 

```zsh
# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
#ZSH_THEME="robbyrussell"
#ZSH_THEME="pygmalion"
ZSH_THEME="agnoster"
```

### Touble Shooting of agnoster theme

위 테마는 `status-line` plugin으로 [Powerline](https://github.com/powerline/powerline)을 사용하는, `Powerline`의 문자를 출력해줄 수 있는 `font`를 설정해주지 않으면 다음과 같이 shell이 깨져보인다.  

이 문제를 해결하기 위해서는 [Powerline fonts](https://github.com/powerline/fonts)를 설치해야한다. 다음 명령을 따라 이를 설치하자. 

```zsh
# clone
git clone https://github.com/powerline/fonts.git --depth=1
# install
cd fonts
./install.sh
# clean-up a bit
cd ..
rm -rf fonts
```

설치가 끝나면 `iTerm2 -> Preference -> Profiles -> Text Tab`을 선택한다.   
해당 탭의 `Font`메뉴에서 `Use a different font for non-ASCII text`의 체크하자. 이를 체크하면, `Non-ASCII Font`메뉴가 나타난다. 이제 `Change Font`버튼을 클릭해서 `*Powerline` 폰트들 중 하나를 선택한다. 
`Non-ASCII Font`에서도 동일한 과정 진행하면 끝.

# Reference

* [zsh](https://sourabhbajaj.com/mac-setup/iTerm/zsh.html)
* [Powerline fonts](https://github.com/powerline/fonts)

