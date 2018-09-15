from django.urls import re_path
from ingredients import views

urlpatterns = [
    re_path(r'^ingredients/$', views.IngredientList.as_view()),
]