from django.urls import re_path
from comment import views

urlpatterns = [
    re_path(r'^comments/$', views.CommentList.as_view()),
]