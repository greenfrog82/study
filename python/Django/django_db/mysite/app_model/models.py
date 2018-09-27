from django.db import models
from django.utils import timezone

class Article(models.Model):
    contents = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)