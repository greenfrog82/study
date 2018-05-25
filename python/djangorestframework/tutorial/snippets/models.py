from django.db import models


class ActiveManager(models.Manager):
    def get_queryset(self):
        return super(ActiveManager, self).get_queryset().filter(is_active=True)


class BaseModel(models.Model):
    is_active = models.BooleanField(default=True)
    objects = ActiveManager()

    def delete(self):
        self.is_active = False
        self.save()

    class Meta:
        abstract = True


class Snippet(BaseModel):
    title = models.CharField(max_length=100, blank=True, default='')
    content = models.TextField()
    owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)
    # created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id', )

    # def save(self, *args, **kwargs):
    #     lexer = get_lexer_by_name(self.language)
    #     linenos = 'table' if self.linenos else False
    #     options = {'title': self.title} if self.title else {}
    #     formatter = HtmlFormatter(style=self.style, linenos=linenos, full=True, **options)
    #     self.highlighted = highlight(self.code, lexer, formatter)
    #     super(Snippet, self).save(*args, **kwargs)

