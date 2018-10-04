import modu.modu_sub
# import modu
from modu.modu_sub.foo import perform as _foo
from modu.modu_sub.foo2 import perform3 as _foo2
# from modu.hoho import perform as _hoho

print '-------------- main'

# modu.modu_package_function()
# modu.modu_sub.modu_package_function()
modu.modu_sub.modu_sub_package_function()
_foo()
_foo2()
# _hoho()