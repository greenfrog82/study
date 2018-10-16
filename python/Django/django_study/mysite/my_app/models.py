from django.db import models

class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


class Flavor(TimeStampedModel):
    title = models.CharField(max_length=200)


class Article(models.Model):
    content = models.CharField(max_length=200)