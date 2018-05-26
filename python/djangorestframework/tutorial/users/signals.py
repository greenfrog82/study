from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import AdminConfig


@receiver(post_save, sender=User)
def send_notify_email(sender, instance, created, **kwargs):
    if not len(User.objects.all()) % AdminConfig.objects.first().email_noti_trigger_count:
        print('--------------- > Send mail to admin')


