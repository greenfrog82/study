from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.test import TestCase

from .models import Article, Author


class TestShortcusts(TestCase):
    def test_get_object_or_404(self):
        with self.assertRaises(Http404):
            get_object_or_404(Article, pk=1)

    def test_catch_http404_when_get_object_or_404_raise_http404_exception(self):
        try:
            get_object_or_404(Article, pk=1)
        except Http404:
            self.assertTrue(True)
        else:
            self.assertTrue(False)


class TestDoesNotExist(TestCase):
    def test_object_does_not_exists(self):
        self.assertRaises(ObjectDoesNotExist, Article.objects.get(pk=1))

    def test_article_does_not_exists(self): 
        self.assertRaises(Article.DoesNotExists, Article.objects.get(pk=1))

    def test_article_does_not_exists_through_author(self):
        self.assertRaises(Author.DoesNotExists, Article.object.get(pk=1))