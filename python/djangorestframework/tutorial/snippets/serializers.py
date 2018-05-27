from rest_framework import serializers
from snippets.models import Snippet
from snippets.models import Tag
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
    tags = serializers.SlugRelatedField(many=True, slug_field="name", queryset=Tag.objects.all(), required=False)

    class Meta:
        model = Snippet
        fields = ('id', 'title', 'content', 'owner', 'comments', 'tags',)

    # def create(self, validated_data):
    #     import pdb; pdb.set_trace()
    #     return super(SnippetSerializer, self).create(validated_data)


class TagSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='snippets.Tag.id', required=False)

    class Meta:
        model = Tag
        fields = ('id', 'name', )