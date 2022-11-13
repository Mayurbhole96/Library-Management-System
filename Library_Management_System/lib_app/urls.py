# from django.contrib import admin
# from django.urls import path, include
from lib_app import views
from django.urls import include, path
from rest_framework import routers
from django.urls.conf import re_path

from . import views

router = routers.DefaultRouter()
router.register('book', views.BookViewSet, basename = 'book')
router.register('signup', views.SignupViewSet, basename = 'signup')
router.register('login', views.LoginViewSet, basename = 'login')

urlpatterns = [
    # path('', views.home, name='home'),
    # path('book', views.BookViewSet.as_view({'get': 'list'}))
    path('', include(router.urls)),
]
