import logging
import logging.config
import pwd
import grp
import os
import stat
from concurrent_log_handler import ConcurrentRotatingFileHandler

class GroupWriteRotatingFileHandler(ConcurrentRotatingFileHandler):
    def doRollover(self):
        """
        Override base class method to make the new log file group writable.
        """
        # Rotate the file first.
        ConcurrentRotatingFileHandler.doRollover(self)

        # Set file permission
        rotated_file_name = '%s.1' % self.baseFilename
        currMode = os.stat(rotated_file_name).st_mode
        os.chmod(self.baseFilename, currMode)

        # Set file owner
        uid = os.stat(rotated_file_name).st_uid
        gid = os.stat(rotated_file_name).st_gid
        os.chown(self.baseFilename, uid, gid)

        #os.chmod(self.baseFilename, currMode)


def owned_file_handler(filename, mode='a', encoding=None, owner=None, maxBytes=0, backupCount=0, chmod=None):
    uid = pwd.getpwnam(owner[0]).pw_uid
    gid = grp.getgrnam(owner[1]).gr_gid

    if filename.endswith(".log"):
        lock_file = filename[:-4]
    else:
        lock_file = filename
    lock_file += ".lock"
    lock_path, lock_name = os.path.split(lock_file)
    # hide the file on Unix and generally from file completion
    lock_name = ".__" + lock_name
    lock_file = os.path.join(lock_path, lock_name)

    if owner:
        if not os.path.exists(filename):
            open(filename, 'a').close()
        os.chown(filename, uid, gid)

        if not os.path.exists(lock_file):
            open(lock_file, 'a').close()
        os.chown(lock_file, uid, gid)

    if chmod:
        if not os.path.exists(filename):
            open(filename, 'a').close()
        os.chmod(filename, chmod)
        
        if not os.path.exists(lock_file):
            open(lock_file, 'a').close()
        os.chmod(lock_file, chmod)
    #logging.handlers.RotatingFileHandler(
    #    filename, mode='a', maxBytes=0, backupCount=0, encoding=None, delay=0)
    #return logging.FileHandler(filename, mode, encoding)
    #return logging.handlers.RotatingFileHandler(filename, mode='a', maxBytes=10, backupCount=10)
    return GroupWriteRotatingFileHandler(filename, maxBytes=maxBytes, backupCount=backupCount)


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '%(asctime)s %(levelname)s %(name)s %(message)s'
        },
    },
    'handlers': {
        'file': {
            '()': owned_file_handler,
            'level': 'DEBUG',
            'formatter': 'default',
            'filename': 'test.log',
            'owner': ['www-data', 'www-data'],
            'chmod': 0660,
            'maxBytes': 30,
            'backupCount': 10
        }
    },
    'root': {
        'handlers': ['file'],
        'level': 'DEBUG',
    },
}

logging.config.dictConfig(LOGGING)
logger = logging.getLogger('mylogger')

for idx in range(0, 10):
    logger.debug('%d > A debug message' % idx)


#print oct(os.stat("test.log").st_mode & 0777)
