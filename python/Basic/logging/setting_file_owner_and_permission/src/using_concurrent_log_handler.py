import logging
import logging.config
import pwd
import grp
import os
import stat
from cloghandler import ConcurrentRotatingFileHandler

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
    import pdb; pdb.set_trace()
    uid = pwd.getpwnam(owner[0]).pw_uid
    gid = grp.getgrnam(owner[1]).gr_gid

    if owner:
        if not os.path.exists(filename):
            open(filename, 'a').close()
        os.chown(filename, uid, gid)
        os.chmod(filename, chmod)
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
