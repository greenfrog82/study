from rest_framework import serializers
from django.contrib.auth.models import User
from snippets.models import Snippet
from comment.models import Comment

class UserSerializer(serializers.ModelSerializer):
    snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())
    comments = serializers.PrimaryKeyRelatedField(many=True, queryset=Comment.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'snippets', 'comments')