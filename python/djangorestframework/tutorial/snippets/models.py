from django.db import models
from libs.models.models import BaseModel


class Snippet(BaseModel):
    title = models.CharField(max_length=100, blank=True, default='')
    content = models.TextField()
    owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)

    class Meta:
        ordering = ('id', )


class Person(BaseModel):
    name = models.CharField(max_length=255)
    age = models.PositiveIntegerField()


class PersonGroup(BaseModel):
    name = models.CharField(max_length=255)
    persons = models.ManyToManyField(
        Person,
        related_name="groups",
        related_query_name="group"
    )