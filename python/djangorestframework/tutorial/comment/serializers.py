from rest_framework import serializers
from comment.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    snippet = serializers.ReadOnlyField(source='snippet.id')

    class Meta:
        model = Comment
        fields = ('id', 'content', 'owner', 'snippet')