def echo_parameters(**kwargs):
    for key, value in kwargs.items():
        print("%s : %s" % (key, value))

# echo_parameters(name='greenfrog', passion='development', language='python')

# echo_parameters({
#     'name': 'greenfrog',
#     'passion': 'development',
#     'language': 'python'
# })

# -------------------------------------------------------------------------------
# Passing keyword arguments to another function with keyword argument.

def pass_kwargs(**kwargs):
    echo_parameters(**kwargs)

# pass_kwargs(language='Python', framework='Django')

pass_kwargs(**{
    'language': 'Python',
    'framework': 'Django'
})
