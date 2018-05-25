from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import generics
from rest_framework import pagination
from rest_framework import permissions
from snippets.permissions import IsOwnerOrReadOnly


class SnippetList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LargeResultsSetPagination(pagination.PageNumberPagination):
    page_size = 1
    page_size_query_param = 'page_size'
    max_page_size = 10000


class SnippetOwnList(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = SnippetSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        return Snippet.objects.filter(owner=self.request.user)


class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer