# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# from django.test import TestCase
import unittest
from models import Post
import pdb

# Create your tests here.
class TestMySQLConnector(unittest.TestCase):
    def test_connect(self):
        Post.objects.create(title='Sample title2', text='Test2').publish()
        Post.objects.create(title='Sample title2', text='Test2').publish()

        for post in Post.objects.all():
            print str(post)
