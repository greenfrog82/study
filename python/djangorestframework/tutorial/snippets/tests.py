from django.test import TestCase
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer

# Create your tests here.
class TestSerializer(TestCase):
    def test_(self):
        data = {
            'title': 'Happy',
            'code': 'def happy(self): pass',
            'linenos': 'True'
        }

        serializer = SnippetSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

        snippet = serializer.save()
        self.assertIsNotNone(snippet.created)
        self.assertEqual(snippet.title, 'Happy')
        self.assertEqual(snippet.code, 'def happy(self): pass')
        self.assertTrue(snippet.linenos)



