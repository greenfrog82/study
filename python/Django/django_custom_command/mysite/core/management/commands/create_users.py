from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'Create random users'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indicates the number of users to be created')
        parser.add_argument('print', type=bool, help='Indicates print result of execution')
        
        # Optional argument
        parser.add_argument('-p', '--prefix', type=str, help='Define a username prefix')

        # Flag argument
        parser.add_argument('-a', '--admin', action='store_true', help='Create an admin account')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        print_result = kwargs['print']

        # Optional argument
        prefix = kwargs['prefix']

        # Flag argument
        admin = kwargs['admin']

        for i in range(total):
            if prefix:
                username = '{prefix}_{random_string}'.format(prefix=prefix, random_string=get_random_string())
            else:
                username = get_random_string()

            create_user = User.objects.create_superuser if admin else User.objects.create_user
            create_user(username=username, email='', password='123')

        if print_result:
            # https://stackoverflow.com/questions/20555673/django-query-get-last-n-records
            # if I don't use str, the following error will occurred.
            """
            Traceback (most recent call last):
            File "manage.py", line 15, in <module>
                execute_from_command_line(sys.argv)
            File "/usr/local/lib/python3.5/dist-packages/django/core/management/__init__.py", line 381, in execute_from_command_line
                utility.execute()
            File "/usr/local/lib/python3.5/dist-packages/django/core/management/__init__.py", line 375, in execute
                self.fetch_command(subcommand).run_from_argv(self.argv)
            File "/usr/local/lib/python3.5/dist-packages/django/core/management/base.py", line 316, in run_from_argv
                self.execute(*args, **cmd_options)
            File "/usr/local/lib/python3.5/dist-packages/django/core/management/base.py", line 353, in execute
                output = self.handle(*args, **options)
            File "/develop/python/Django/django_custom_command/mysite/core/management/commands/create_users.py", line 22, in handle
                # https://stackoverflow.com/questions/20555673/django-query-get-last-n-records
            File "/usr/local/lib/python3.5/dist-packages/django/core/management/base.py", line 142, in write
                if ending and not msg.endswith(ending):
            AttributeError: 'QuerySet' object has no attribute 'endswith
            """
            self.stdout.write(str(User.objects.all().order_by('-id')[:total][::-1]))
        
        