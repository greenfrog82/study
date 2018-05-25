from django.urls import re_path
from users import views

urlpatterns = [
    re_path(r'^users/$', views.UserList.as_view()),
    re_path(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view())
]