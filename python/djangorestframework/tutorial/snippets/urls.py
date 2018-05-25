from django.urls import re_path
# from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views

urlpatterns = [
    re_path(r'^snippets/$', views.SnippetList.as_view()),
    re_path(r'^snippets/own/$', views.SnippetOwnList.as_view()),
    re_path(r'^snippets/search/$', views.SnippetSearchList.as_view()),
    re_path(r'^snippets/(?P<pk>[0-9]+)/$', views.SnippetDetail.as_view()),
]

# urlpatterns = format_suffix_patterns(urlpatterns)