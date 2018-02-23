# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.db import connection, connections

# Create your tests here.
class TestAccessOtherDB(TestCase):
    def test_access_default_db(self):
        cursor = connection.cursor()
        cursor.execute('select * from django_migrations')
        rows = cursor.fetchall()
        
        for row in rows:
            print row

    def test_access_study_db(self):
        cursor = connections['study'].cursor()
        cursor.execute('select * from professor')
        rows = cursor.fetchall()

        for row in rows:
            print row
