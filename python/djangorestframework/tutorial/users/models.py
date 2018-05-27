from django.db import models
from django.contrib.auth.models import User
from libs.models.models import BaseModel

class AdminConfig(BaseModel):
    email_noti_trigger_count = models.PositiveIntegerField(default=2, verbose_name=u'Signal count for the email notification about user registration.')