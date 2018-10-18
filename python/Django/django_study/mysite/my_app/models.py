from django.db import models

class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


class Flavor(TimeStampedModel):
    title = models.CharField(max_length=200)


class Author(models.Model):
    name = models.CharField(max_length=120)


class Article(models.Model):
    content = models.CharField(max_length=200)
    author = models.ForeignKey('Author', on_delete=models.CASCADE)

