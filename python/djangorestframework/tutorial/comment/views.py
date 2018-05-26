from rest_framework import generics
from rest_framework import permissions
from snippets.models import Snippet
from comment.models import Comment
from comment.serializers import CommentSerializer


class CommentList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, snippet=Snippet.objects.get(pk=self.request.data.get('snippetId')))
        serializer.save(owner=self.request.user)