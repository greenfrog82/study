# This way work very well.
# from src.game.sound.volume import work_together_render

# This way occurs the following error.
#
# Traceback (most recent call last):
#   File "/home/jaeyoungcho/develop/github/study/python/Basic/module/src/game/import_5.py", line 2, in <module>
#     from sound.volume import work_togehter_render
#   File "/media/jaeyoungcho/develop/github/study/python/Basic/module/src/game/sound/volume.py", line 1, in <module>
#     from ..graphic.render import test_render
# ValueError: attempted relative import beyond top-level package
# from sound.volume import work_together_render

# This way occurs the other error. please see the follwing error message.
#
# Traceback (most recent call last):
#   File "/home/jaeyoungcho/develop/github/study/python/Basic/module/src/game/import_5.py", line 12, in <module>
#     from .sound.volume import work_togehter_render
# SystemError: Parent module '' not loaded, cannot perform relative import
from .sound.volume import work_togehter_render

work_together_render()

