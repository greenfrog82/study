import logging
import time

from logging.handlers import TimedRotatingFileHandler

#----------------------------------------------------------------------
# def create_timed_rotating_log(path):
#     """"""
#     logger = logging.getLogger("Rotating Log")
#     # logger.setLevel(logging.INFO)
#
#     handler = TimedRotatingFileHandler(path,
#                                        when="m",
#                                        interval=1,
#                                        backupCount=5)
#
#     handler.setLevel(loggin.INFO)
#     logger.addHandler(handler)
#
#     for i in range(6):
#         logger.error("This is a test!")
#         time.sleep(75)


def create_timed_rotating_log(path):
    """"""
    logger = logging.getLogger("httpd_monitoring_rotate_logger")
    logger.setLevel(logging.DEBUG)

    formatter = logging.Formatter('%(asctime)s %(levelname)s: %(message)s')

    fh = TimedRotatingFileHandler(path, when="m", interval=1, backupCount=5)
    fh.setFormatter(formatter)
    fh.setLevel(logging.DEBUG)

    ch = logging.StreamHandler()
    ch.setFormatter(formatter)
    ch.setLevel(logging.DEBUG)

    logger.addHandler(ch)
    logger.addHandler(fh)

    # return logger

    for i in range(6):
        logger.error("This is a test!")
        time.sleep(70)

 #----------------------------------------------------------------------
if __name__ == "__main__":
    log_file = "timed_test.log"
    create_timed_rotating_log(log_file)
    # logger.debug('This is test log.')
