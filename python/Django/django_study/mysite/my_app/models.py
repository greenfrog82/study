from django.db import models

# Create your models here.
class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


class Flavor(TimeStampedModel):
    title = models.CharField(max_length=200)