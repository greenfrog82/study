from celery.decorators import task
from celery.utils.log import get_task_logger
import logging

from feedback.emails import send_feedback_email

logger = get_task_logger(__name__)
_logger = logging.getLogger('prism')


@task(name="send_feedback_email_task")
def send_feedback_email_task(email, message):
    """sends an email when feedback form is filled successfully"""
    _logger.info(str(_logger))
    _logger.info(str(logger))
    logger.info(str(logging.Logger.manager.loggerDict))
    logger.info("Sent feedback email")
    logger.info("__")
    return send_feedback_email(email, message)
