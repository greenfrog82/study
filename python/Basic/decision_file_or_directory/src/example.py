import os


def check(item):
    print(item + ' is ' + (os.path.isfile(item) and 'file.' or 'not file.'))
    print(item + ' is ' + (os.path.isdir(item) and 'directory.' or 'not directory.'))

file = './example.py'
check(file)

folder = './../src'
check(folder)
