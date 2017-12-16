from uuid import getnode

mac_addr = getnode()

if 2485378154498 == mac_addr:
    from manage_settings.config.developer_1 import *
elif 3485378154498 == mac_addr:
    from manage_settings.config.developer_2 import *
else:
    from manage_settings.config.production import *
