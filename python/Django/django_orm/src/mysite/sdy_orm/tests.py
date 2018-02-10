# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.contrib.auth.models import User
from sdy_orm.models import Writer, Post
from django.db import connection


# Create your tests here.
class TestORM(TestCase):
    def setUp(self):
        print '--- setUp'
        Writer.objects.create(name='test')
        Post(author=Writer.objects.get(pk=1), title='hoho', text='msg').publish()
        print connection.queries
        print 'Queries count : %d' % len(connection.queries)


    def tearDown(self):
        pass        

    def test_code(self):
        print '--- test_code'
        print Post.objects.all()
        print connection.queries
        print 'Queries count : %d' % len(connection.queries)

    def test_code2(self):
        print '--- test_code2'
        print Post.objects.count()