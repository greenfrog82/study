from rest_framework import serializers
from snippets.models import Snippet
from comment.models import Comment
from hashid_field.rest import HashidSerializerCharField


class SnippetSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='snippets.Snippet.id', required=False)
    owner = serializers.ReadOnlyField(source='owner.username')
    comments = serializers.PrimaryKeyRelatedField(
        pk_field=HashidSerializerCharField(source_field='comment.Comment.id'),
        many=True,
        queryset=Comment.objects.all(),
        required=False)

    class Meta:
        model = Snippet
        fields = ('id', 'title', 'content', 'owner', 'comments')