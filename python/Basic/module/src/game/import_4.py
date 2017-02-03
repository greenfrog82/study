from src.game.sound import *

echo.test_echo()

# This code occurs the following error. Because 'volume' function is not included in __all__ variable in __init__.py
#
# /usr/bin/python3.5 /home/jaeyoungcho/develop/github/study/python/Basic/module/src/game/import_4.py
# echo test
# Traceback (most recent call last):
#   File "/home/jaeyoungcho/develop/github/study/python/Basic/module/src/game/import_4.py", line 7, in <module>
#     volume.up()
# NameError: name 'volume' is not defined
volume.up()