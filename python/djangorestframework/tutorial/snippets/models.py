from django.db import models
# from libs.models.models import BaseModel


# class Snippet(BaseModel):
#     title = models.CharField(max_length=100, blank=True, default='')
#     content = models.TextField()
#     owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)
#
#     class Meta:
#         ordering = ('id', )
#
#     # def save(self, force_insert=False, force_update=False, using=None,
#     #          update_fields=None):
#     #     import pdb; pdb.set_trace()
#     #     super(BaseModel, self).save(force_insert, force_update, using, update_fields)

class Author(models.Model):
    name = models.CharField(max_length=100)


class Snippet(models.Model):
    # author = models.ForeignKey(Author, primary_key=True, on_delete=models.CASCADE, unique=True)
    author = models.OneToOneField(Author, primary_key=True, on_delete=models.CASCADE)
    # author = models.ForeignKey(Author, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
    linenos = models.BooleanField(default=False)

    class Meta:
        ordering = ('created',)


# class Tag(BaseModel):
#     name = models.CharField(max_length=255)
#     # persons = models.ManyToManyField(
#     snippets = models.ManyToManyField(
#         Snippet,
#         related_name="tags",
#         related_query_name="tag"
#     )