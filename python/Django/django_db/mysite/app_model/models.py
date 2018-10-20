from django.db import models
from django.contrib.auth.models import User
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


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    hobby = models.CharField(max_length=16)

    class Meta():
        ordering = ['-id']