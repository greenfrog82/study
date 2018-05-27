from django.db import models
from libs.models.models import BaseModel
from snippets.models import Snippet
from hashid_field import HashidField

class Comment(BaseModel):
    content = models.TextField()
    owner = models.ForeignKey('auth.User', related_name='comments', on_delete=models.CASCADE)
    snippet = models.ForeignKey(Snippet, related_name='comments', on_delete=models.CASCADE)

    class Meta:
        ordering = ('id',)

