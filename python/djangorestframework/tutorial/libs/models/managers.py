from django.db import models
from random import shuffle


class ActiveManager(models.Manager):
    def get_queryset(self):
        return super(ActiveManager, self).get_queryset().filter(is_active=True)

    def random(self):
        qs = self.all()
        indexes = [i for i in range(len(qs))]
        shuffle(indexes)
        return [qs[i] for i in indexes]

