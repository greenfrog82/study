# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from manage_settings.settings import *

class ManageMultipleSettings(TestCase):
    def setUp(self):
        pass

    def test_develper_1(self):
        self.assertTrue(DEBUG)
        self.assertEquals(ALLOWED_HOSTS[0], 'django-dev-1.cdnetworks.com')
        self.assertEquals(ID, 'development')
        self.assertEquals(PW, '4321')