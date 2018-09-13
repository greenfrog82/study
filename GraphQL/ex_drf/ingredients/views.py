from rest_framework import generics
from ingredients.models import Ingredient
from ingredients.serializers import IngredientSerializer


class IngredientList(generics.ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer