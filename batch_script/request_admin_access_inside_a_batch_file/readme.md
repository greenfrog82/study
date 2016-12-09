# 배치 스크립트에서 관리자 권한 요청하기

Windows Vista 때 부터 시스템에 영향을 주는 동작을 하는 코드들은 관리자 권한이 필요하다.
따라서, 일반적으로 윈도우 프로그래밍을 할 때는 실행 파일을 실행할 때 관리자 권한으로의 승격을 요청하도록 처리를 해둔다.

이와 같이, 배치 스크립트를 실행할 때는 다음과 같은 코드를 넣어두면 관리자 권한으로의 승격을 요청하도록 해준다.

```
@echo off

:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
    IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params = %*:"=""
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"

:--------------------------------------    

:: <YOUR BATCH SCRIPT HERE>
```

## 참조

* [Stackoverflow - How to request Administrator access inside a batch file](http://stackoverflow.com/questions/1894967/how-to-request-administrator-access-inside-a-batch-file/10052222#10052222)
