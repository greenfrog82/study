import logging
import logging.config
import pwd
import grp
import os
import stat
from concurrent_log_handler import ConcurrentRotatingFileHandler

class ConcurrentRotatingFileHandlerEx(ConcurrentRotatingFileHandler):
    def __init__(self, filename, mode='a', maxBytes=0, backupCount=0,
                 encoding=None, debug=False, delay=0, use_gzip=False, owner=None, chmod=None):
        self.owner = owner
        self.chmod = chmod

        # super(ConcurrentRotatingFileHandler, self).__init__(filename, mode, maxBytes, backupCount, encoding, debug, delay, use_gzip)
        ConcurrentRotatingFileHandler.__init__(self, filename, mode, maxBytes, backupCount, encoding, debug, delay, use_gzip)

    def _open(self, mode=None):
        stream = ConcurrentRotatingFileHandler._open(self, mode)

        if self.owner:
            uid = pwd.getpwnam(self.owner[0]).pw_uid
            gid = grp.getgrnam(self.owner[1]).gr_gid

            os.chown(self.baseFilename, uid, gid)

        if self.chmod:
            os.chmod(self.baseFilename, self.chmod)

        return stream

    def _open_lockfile(self):
        ConcurrentRotatingFileHandler._open_lockfile(self)

        if self.baseFilename.endswith(".log"):
            lock_file = self.baseFilename[:-4]
        else:
            lock_file = self.baseFilename
        lock_file += ".lock"
        lock_path, lock_name = os.path.split(lock_file)
        # hide the file on Unix and generally from file completion
        lock_name = ".__" + lock_name
        lock_file = os.path.join(lock_path, lock_name)
                   
        if self.owner:
            uid = pwd.getpwnam(self.owner[0]).pw_uid
            gid = grp.getgrnam(self.owner[1]).gr_gid

            os.chown(lock_file, uid, gid)

        if self.chmod:
            os.chmod(lock_file, self.chmod)

logging.handlers.ConcurrentRotatingFileHandlerEx = ConcurrentRotatingFileHandlerEx

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
            'level': 'DEBUG',
            'class': 'logging.handlers.ConcurrentRotatingFileHandlerEx',
            'formatter': 'default',
            'filename': 'test.log',
            'owner': ['www-data', 'www-data'],
            'chmod': 0660,
            'maxBytes': 30,
            'backupCount': 10,
            'use_gzip': True,
            'delay': True
        }
    },
    'root': {
        'handlers': ['file'],
        'level': 'DEBUG',
    },
}

logging.config.dictConfig(LOGGING)
logger = logging.getLogger(__name__)

for idx in range(0, 10):
    logger.debug('%d > A debug message' % idx)
