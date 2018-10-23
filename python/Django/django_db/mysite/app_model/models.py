from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Article(models.Model):
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)

    # def save(self, **kwargs):
    #     import pdb; pdb.set_trace()
    #     super(Point, self).save(**kwargs)

class Point(models.Model):
    x = models.PositiveIntegerField()
    y = models.PositiveIntegerField()


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    platform = models.CharField(max_length=10)
    platform_id = models.CharField(max_length=10)

    class Meta:
        unique_together = ('user', 'platform', 'platform_id')