import logging
import logging.config
import pwd
import grp
import os

class RotatingFileHandlerEx(logging.handlers.RotatingFileHandler):
    def __init__(self, filename, mode='a', maxBytes=0, backupCount=0, encoding=None, delay=0, owner=None, chmod=None):
        self.owner = owner
        self.chmod = chmod

        logging.handlers.RotatingFileHandler.__init__(self, filename, mode, maxBytes, backupCount, encoding, delay)

    def _open(self):
        stream = logging.handlers.RotatingFileHandler._open(self)
            
        if self.owner:
            uid = pwd.getpwnam(self.owner[0]).pw_uid
            gid = grp.getgrnam(self.owner[1]).gr_gid

            os.chown(self.baseFilename, uid, gid)

        if self.chmod:
            os.chmod(self.baseFilename, self.chmod)

        return stream

logging.handlers.RotatingFileHandlerEx = RotatingFileHandlerEx

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
            'class': 'logging.handlers.RotatingFileHandlerEx',
            'formatter': 'default',
            'filename': 'test.log',
            'owner': ['www-data', 'www-data'],
            'chmod': 0660,
            'maxBytes': 60,
            'backupCount': 10,
            # 'delay': True
            'delay': False
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