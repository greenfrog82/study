from rest_framework import serializers
from snippets.models import Snippet
from comment.models import Comment


class SnippetSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    comments = serializers.PrimaryKeyRelatedField(many=True, queryset=Comment.objects.all())

    class Meta:
        model = Snippet
        fields = ('id', 'title', 'content', 'owner', 'comments')