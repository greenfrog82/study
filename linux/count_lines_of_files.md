# How to count line of specific files

Python으로 file logging을 할 떄, Multi Processes에 대한 처리가 정상적으로 되는지 확인하기 위해서 출력 된 Log 파일들(RotateFileHandler 를 사용하였으므로 파일이 rotate되어 여러개의 로그파일이 생성된다.)기대했던 로그가 모두 출력되었는지 확인할 필요가 있다.  

예를들어, 프로세스를 3개 띄우고 각각 10000개의 로그를 출력하도록 했다고 하자. 그러면 기대되는 결과는 총 30000개의 로그가 출력되는 것이다.  
이를 확인하기 위해서 출력 된 로그 파일들에 출력 된 로그 수를 셀 필요가 있었다.  
이때, 하나의 로그는 오직 한 라인씩 출력되도록 해두었었다. 

이를 확인하는 방법은 다음 명령을 통해 아주 간단히 수행할 수 있다. 

> $ find \<path\> -name '\<file\>' | xargs wc -l

예를들어, 해당 문서가 존재하는 경로 및 하위경로의 모든 Mark Down 문서에 대해서 작성 된 라인 수를 확인하고 싶으면 다음과 같이 하면 된다. 

```sh
$ find . -name '*.md' | xargs wc -l
      11 ./apt.md
      39 ./login_loop.md
      42 ./compress/readme.md
      18 ./how_to_copy_directory_and_files_another_folder.md
       0 ./count_lines_of_files.md
      67 ./how_to_add_git_branch_into_command_line/readme.md
      77 ./du/readme.md
      28 ./printing_group_list.md
       4 ./bash_on_windows.md
      38 ./iptables.md
      34 ./install_app.md
      74 ./grep/grep.md
      11 ./shell_scripting/getting_current_path.md
      33 ./alias.md
      58 ./setting_hangul/readme.md
      73 ./recursively_delete_all_specific_files.md
      37 ./how_to_find_which_process_listen_upon_a_port.md
      96 ./redshift.md
      33 ./link.md
      28 ./fuser.md
      21 ./dollar_command_in_bash.md
      16 ./automount/automount.md
      69 ./terminator.md
     907 total
```

위에 보이는바와 같이 검색 된 모든 Mark Down 파일이 열거되고 각 파일명 앞에 라인 수가 출력된다.  
그리고 맨 마지막에 total이라는 라벨이 보이는데 이는 모든 파일의 라인 수의 합이다. 

## Reference

* [How to count all the lines of code in a directory recursively?
](https://stackoverflow.com/questions/1358540/how-to-count-all-the-lines-of-code-in-a-directory-recursively)

 