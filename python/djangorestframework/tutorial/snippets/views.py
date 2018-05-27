from snippets.models import Snippet
from snippets.models import Tag
from snippets.serializers import SnippetSerializer
from snippets.serializers import TagSerializer
from rest_framework import generics
from libs.views import paginations
from rest_framework import permissions
from snippets.permissions import IsOwnerOrReadOnly


class SnippetList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TagList(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    # def perform_create(self, serializer):
    #     #
    #     import pdb;
    #     pdb.set_trace()
    #     # # serializer.save()
    #     # super(PersonList, self).perform_create(serializer)
    #     serializer.save()


class SnippetBaseReadOnlyList(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = SnippetSerializer


class SnippetOwnList(SnippetBaseReadOnlyList):
    pagination_class = paginations.OwnContentPageNumberPagination

    def get_queryset(self):
        return Snippet.objects.filter(owner=self.request.user)


class SnippetSearchList(SnippetBaseReadOnlyList):
    def get_queryset(self):
        return Snippet.objects.filter(content__icontains=self.request.query_params.get('content'))


class SnippetRandomSearchList(SnippetBaseReadOnlyList):
    def get_queryset(self):
        return Snippet.objects.random()


class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer