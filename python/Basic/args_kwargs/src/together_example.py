def print_parameter(*args, **kwargs):
    print args
    print kwargs

print_parameter(1, 2)

print_parameter(name='greenfrog', job='developer')

print_parameter(1, 2, name='greenfrog', job='developer')

print_parameter(1, name='greenfrog', job='developer', 2)
