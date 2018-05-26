from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=User)
def send_notify_email(sender, instance, created, **kwargs):
    if not len(User.objects.all()) % 2:
        print('--------------- > Send mail to admin')


