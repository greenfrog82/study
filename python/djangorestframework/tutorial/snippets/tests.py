from django.test import TestCase
from snippets.models import Author
from snippets.models import Snippet
from snippets.serializers import AuthorSerializer
from snippets.serializers import SnippetSerializer

# Create your tests here.
class TestSerializer(TestCase):
    def test_(self):
        serializer = AuthorSerializer(data={'name':'greenfrog'})
        self.assertTrue(serializer.is_valid(), serializer.errors)

        author = serializer.save()
        self.assertEqual(author.id, 1)
        self.assertEqual(author.name, 'greenfrog')

        data = {
            'author': author.id,
            # 'author': str(author.id),
            'title': 'Happy',
            'code': 'def happy(self): pass',
            'linenos': 'True'
        }

        serializer = SnippetSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

        snippet = serializer.save()
        # self.assertEqual(snippet.id, 1)
        self.assertIsNotNone(snippet.created)
        self.assertEqual(snippet.author, author)
        self.assertEqual(snippet.title, 'Happy')
        self.assertEqual(snippet.code, 'def happy(self): pass')
        self.assertTrue(snippet.linenos)



