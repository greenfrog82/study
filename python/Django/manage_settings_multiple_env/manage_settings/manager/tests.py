# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from manage_settings.settings import *


# Create your tests here.
class ManageMultipleSettings(TestCase):
    def setUp(self):
        pass

    def test_code(self):
        self.assertTrue(DEBUG)
        self.assertEquals(ALLOWED_HOSTS[0], 'django.cdnetworks.com')
