import os

print 'filename.ext :', os.path.splitext('filename.ext')
print 'filename..ext : ', os.path.splitext('filename..ext')
print 'filename :', os.path.splitext('filename')
print 'filename. :', os.path.splitext('filename.')
print '.filename.ext :', os.path.splitext('.filename.ext')
print '/filename.ext :', os.path.splitext('/filename.ext')
print 'file.name.ext :', os.path.splitext('file.name.ext')
print '/usr/local/filename.ext :', os.path.splitext('/usr/local/filename.ext')
print '123123.123 :', os.path.splitext('123123.123')
print '!@@!#-234._)((** :', os.path.splitext('!@@!#-234._)((**')