import logging
import time

from logging.handlers import RotatingFileHandler

#----------------------------------------------------------------------
def create_rotating_log(path):
    """
    Creates a rotating log
    """
    logger = logging.getLogger("Rotating Log")
    logger.setLevel(logging.INFO)

    # add a rotating handler
    handler = RotatingFileHandler(path, maxBytes=20,
                                  backupCount=5)
    logger.addHandler(handler)

    return logger



#----------------------------------------------------------------------
if __name__ == "__main__":
    # log_file = "./../logs/test.log"
    log_file = "test.log"
    logger = create_rotating_log(log_file)

    for i in range(10):
        logger.info("This is test log line %s" % i)
        time.sleep(1.5)
