from django.conf import settings
from rest_framework import pagination


class OwnContentPageNumberPagination(pagination.PageNumberPagination):
    page_size = settings.CUSTOM_USER_CONFIG['PAGINATION_INFO']['PAGE_SIZE']
    page_size_query_param = 'page_size'
    max_page_size = settings.CUSTOM_USER_CONFIG['PAGINATION_INFO']['MAX_PAGE_SIZE']