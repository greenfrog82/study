from django.db import models

class AdminConfig(models.Model):
    email_noti_trigger_count = models.PositiveIntegerField(default=2)