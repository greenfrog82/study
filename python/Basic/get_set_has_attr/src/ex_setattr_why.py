class Setting:
    host = 'localhost'
    port = 8080
        
dict_settings = {
    'host': '1.1.1.1',
    'port': 7777,
    'description': 'This is the example setattr'
}

setting = Setting()

for key in dict_settings:
    setattr(setting, key, dict_settings[key])

print setting.host
print setting.port
print getattr(setting, 'description', 'There is no description')