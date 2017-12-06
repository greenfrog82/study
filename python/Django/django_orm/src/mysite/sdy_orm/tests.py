# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.contrib.auth.models import User
from sdy_orm.models import Writer, Post


# Create your tests here.
class TestORM(TestCase):
    def setUp(self):
        Writer.objects.create(name='test')
        Post(author=Writer.objects.get(pk=1), title='hoho', text='msg').publish()

    def test_code(self):
        print Post.objects.all()