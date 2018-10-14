from django.db import models
from django.utils import timezone

class Article(models.Model):
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    # def save(self, **kwargs):
    #     import pdb; pdb.set_trace()
    #     super(Point, self).save(**kwargs)


class Point(models.Model):
    x = models.PositiveIntegerField()
    y = models.PositiveIntegerField()