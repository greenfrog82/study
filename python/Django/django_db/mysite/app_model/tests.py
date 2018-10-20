from django.test import TestCase
from django.contrib.auth.models import User
from .models import UserProfile

# Create your tests here.
class TestWrongOneToOne(TestCase):
    def SetUp(self):
        self.foo = User.objects.create_user('foo', '1234')
        
    def test_1(self):
        UserProfile.objects.create(user=self.foo, hobby='a')
        UserProfile.objects.create(user=self.foo, hobby='b')