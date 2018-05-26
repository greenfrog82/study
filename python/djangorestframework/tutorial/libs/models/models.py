from django.db import models
from libs.models.managers import ActiveManager


class BaseModel(models.Model):
    is_active = models.BooleanField(default=True)
    objects = ActiveManager()

    def delete(self):
        self.is_active = False
        self.save()

    class Meta:
        abstract = True
