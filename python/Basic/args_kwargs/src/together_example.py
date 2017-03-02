def print_parameter(arg1, arg2, *args, **kwargs):
    print(arg1)
    print(arg2)
    print(args)
    print(kwargs)

# print_parameter(1, 2)

# print_parameter(1, 2, 3, 4)

# print_parameter(1, 2, 3, 4, name='greenfrog', job='developer')

print_parameter(arg1=1, arg2=2, 3, 4, name='greenfrog', job='developer')