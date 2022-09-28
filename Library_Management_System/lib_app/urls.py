# from django.contrib import admin
# from django.urls import path, include
from lib_app import views
from django.urls import include, path
from rest_framework import routers
from django.urls.conf import re_path

from . import views

router = routers.DefaultRouter()
router.register(r'book', views.BookViewSet, basename = 'book')
router.register(r'signup', views.SignupViewSet, basename = 'signup')
router.register(r'login', views.LoginViewSet, basename = 'login')

urlpatterns = [
    # path('', views.home, name='home'),
    path('', include(router.urls)),
]
