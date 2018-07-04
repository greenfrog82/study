class File(object):
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        self.open_file = open(self.filename, self.mode)
        return self.open_file

    def __exit__(self, *args):
        self.open_file.close()


# files = []
# for _ in range(10000):
#     with File('foo.txt', 'w') as infile:
#         infile.write('foo')
#         files.append(infile)


from contextlib import contextmanager

@contextmanager
def open_file(path, mode):
    the_file = open(path, mode)
    yield the_file
    the_file.close()

with open_file('foo.txt', 'w') as infile:
    infile.write('foo')