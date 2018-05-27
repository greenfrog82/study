from rest_framework import serializers
from snippets.models import Snippet, Person, PersonGroup
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


class PersonSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='snippets.Person.id', required=False)
    groups = serializers.SlugRelatedField(many=True, slug_field="name", queryset=PersonGroup.objects.all())

    class Meta:
        model = Person
        fields = ('id', 'name', 'age', 'groups',)


class PersonGroupSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='snippets.PersonGroup.id', required=False)

    class Meta:
        model = PersonGroup
        fields = ('id', 'name',)