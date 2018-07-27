from rest_framework import serializers
from snippets.models import Author
from snippets.models import Snippet


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = '__all__'
        # fields = ('title', 'code', 'linenos')