def echo_parameters(**kwargs):
    for key, value in kwargs.items():
        print("%s : %s" % (key, value))

echo_parameters(name='greenfrog', passion='development', language='python')

echo_parameters({
    'name': 'greenfrog',
    'passion': 'development',
    'language': 'python'
})
