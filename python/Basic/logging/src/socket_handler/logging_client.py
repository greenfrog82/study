import logging
import logging.handlers

logger = logging.getLogger(__name__)

sockethandler = logging.handlers.SocketHandler('127.0.0.1', 7777)

# don't bother with a formatter, since a socket handler sends the event as
# an unformatted pickle
logger.addHandler(sockethandler)
logger.setLevel(logging.DEBUG)

logger.debug("Test message.")