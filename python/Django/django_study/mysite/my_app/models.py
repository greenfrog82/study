from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
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


class PublishedManager(models.Manager): 
    use_for_related_fields = True

    def ordering_desc(self, **kwargs):
        return self.order_by('-id')


class Sample(models.Model):
    dummy_data = models.PositiveIntegerField()
    objects = PublishedManager()


class GFKModel(models.Model):
    content = models.CharField(max_length=200)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')