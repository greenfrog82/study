from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import AdminConfig


@receiver(post_save, sender=User)
def send_notify_email(sender, instance, created, **kwargs):
    admin_config = AdminConfig.objects.first()
    if admin_config and not len(User.objects.all()) % admin_config.email_noti_trigger_count:
        print('--------------- > Send mail to admin')


