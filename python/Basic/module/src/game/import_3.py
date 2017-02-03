import src.game.graphic.render

# This code work well.
# src.game.graphic.render.test_render()

# This code occurs the following error. Because import operator just mark that src.game.graphic.render is able to use in this module.
#
# /usr/bin/python3.5 /home/jaeyoungcho/develop/github/study/python/Basic/module/src/game/import_3.py
# Traceback (most recent call last):
#  File "/home/jaeyoungcho/develop/github/study/python/Basic/module/src/game/import_3.py", line 4, in <module>
#    render.test_render()
# NameError: name 'render' is not defined
render.test_render()