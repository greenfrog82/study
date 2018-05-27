from rest_framework import serializers
from django.contrib.auth.models import User
from snippets.models import Snippet
from comment.models import Comment
from hashid_field.rest import HashidSerializerCharField

class UserSerializer(serializers.ModelSerializer):
    snippets = serializers.PrimaryKeyRelatedField(
        pk_field=HashidSerializerCharField(source_field='snippets.Snippet.id'),
        many=True,
        queryset=Snippet.objects.all())
    comments = serializers.PrimaryKeyRelatedField(
        pk_field=HashidSerializerCharField(source_field='comment.Comment.id'),
        many=True,
        queryset=Comment.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'snippets', 'comments')