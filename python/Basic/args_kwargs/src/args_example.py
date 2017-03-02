def echo_parameters(*args):
  for item in args:
    print(item)

echo_parameters(1, 2, 3, 'test')

echo_parameters([1, 2, 3, 'test'], 1, 2, 3)

echo_parameters((1, 2, 3, 'test'), 1, 2 ,3)
