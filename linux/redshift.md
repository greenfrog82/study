# Redshift

_본 문서는 우분투 리눅스 16.04를 기준으로 설명한다._ 

## 개요

[Redshift](http://jonls.dk/redshift/)는 블루라이트를 차단해주는 소프트웨어이다. Windows 10을 사용할 때는 [f.lux](https://justgetflux.com/)를 사용하였지만, 리눅스에서는 공식지원을 하지 않기 때문에 리눅스에서 블루라이트를 차단하는 프로그램을 찾던 중 [Redshift](http://jonls.dk/redshift/)를 알게되어 이를 사용해보았다. 

## 설치하기

커맨드에서 다음과 같은 명령을 통해 설치를한다. [Redshift](http://jonls.dk/redshift/)는 실제 블루라이트를 차단해주는 프로그램이고 redshift-gtk는 UI를 제공해주는 프로그램이다. redshift-gtk를 설치하면 [Redshift](http://jonls.dk/redshift/) 트레이 아이콘이 나타난다. 

> sudo apt-get install redshift redshift-gtk

## 설정하기

redshift-gtk는 아쉽게도 [Redshift](http://jonls.dk/redshift/)의 실행상태 정도만을 인지시키는 역할을 하기 때문에 설정 파일을 통해 설정을 관리해야한다. 

~/.config/redshift.conf 파일을 생성한 후 다음과 같이 설정 내용을 입력하자. 

```
; Global settings for redshift
[redshift]
; Set the day and night screen temperatures
temp-day=4200
temp-night=3500

; Enable/Disable a smooth transition between day and night
; 0 will cause a direct change from day to night screen temperature.
; 1 will gradually increase or decrease the screen temperature.
transition=1

; Set the screen brightness. Default is 1.0.
;brightness=0.9
; It is also possible to use different settings for day and night
; since version 1.8.
;brightness-day=0.7
;brightness-night=0.4
; Set the screen gamma (for all colors, or each color channel
; individually)
gamma=0.8
;gamma=0.8:0.7:0.8
; This can also be set individually for day and night since
; version 1.10.
;gamma-day=0.8:0.7:0.8
;gamma-night=0.6

; Set the location-provider: 'geoclue', 'geoclue2', 'manual'
; type 'redshift -l list' to see possible values.
; The location provider settings are in a different section.
location-provider=manual

; Set the adjustment-method: 'randr', 'vidmode'
; type 'redshift -m list' to see all possible values.
; 'randr' is the preferred method, 'vidmode' is an older API.
; but works in some cases when 'randr' does not.
; The adjustment method settings are in a different section.
adjustment-method=randr

; Configuration of the location-provider:
; type 'redshift -l PROVIDER:help' to see the settings.
; ex: 'redshift -l manual:help'
; Keep in mind that longitudes west of Greenwich (e.g. the Americas)
; are negative numbers.
[manual]
lat=37.5665
lon=126.9780

; Configuration of the adjustment-method
; type 'redshift -m METHOD:help' to see the settings.
; ex: 'redshift -m randr:help'
; In this example, randr is configured to adjust screen 1.
; Note that the numbering starts from 0, so this is actually the
; second screen. If this option is not specified, Redshift will try
; to adjust _all_ screens.
[randr]
screen=0
```

옵션의 내용을 아직 다 파악하지는 못했지만 다음 내용들만 우선 설정해도 쓰는데는 지장없다. 

### 색 온도

temp-day=4200     낮 시간동안의 모니터 색 온도 설정
temp-night=3500   밤 시간동안의 모니터 색 온도 설정

### 컴퓨터 위치 설정

lat=37.5665       위도 (현재 설정 값은 서울 기준)
lon=126.9780      경도 (현재 설정 값은 서울 기준)


## 참조

* [Redshift Configuration and use](https://help.ubuntu.com/community/Redshift)
* [How do I install redshift in Ubuntu](http://askubuntu.com/questions/482373/how-do-i-install-redshift-in-ubuntu)
