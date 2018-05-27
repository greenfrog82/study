from rest_framework import serializers
from comment.models import Comment
from hashid_field.rest import HashidSerializerCharField


class CommentSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='comment.Comment.id', required=False)
    owner = serializers.ReadOnlyField(source='owner.username')
    snippet = serializers.ReadOnlyField(
        # source='snippets.Snippet')
        source='self')

    class Meta:
        model = Comment
        fields = ('id', 'content', 'owner', 'snippet')
