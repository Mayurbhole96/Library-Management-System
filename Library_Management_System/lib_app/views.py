from imaplib import _Authenticator
from multiprocessing import AuthenticationError
from sqlite3 import IntegrityError
from django.shortcuts import render, HttpResponse
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from lib_app.models import Book
from lib_app.serializers import BookSerializer

# Create your views here.
# def home(request):
#     html = "<html><body>Hello World..!!</body></html>"
#     return HttpResponse(html)

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.filter(is_deleted=False,is_active=True)
    serializer_class = BookSerializer

    def list(self, request):
        book_obj = Book.objects.filter(is_deleted=False,is_active=True).order_by('-id')
        serializer = self.get_serializer(book_obj, many=True)
        return Response(serializer.data) 

    def create(self, request):
        print(request.data,'----')
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status":"Record Created Successfully"},status=status.HTTP_201_CREATED)
        else:
            return Response({"status":status.HTTP_400_BAD_REQUEST,"message":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None, partial=True):
        channel_obj = Book.objects.get(id=pk)
        serializer = BookSerializer(channel_obj,data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status":"Record Updated Successfully"},status=status.HTTP_201_CREATED)
        else:
            return Response({"status":status.HTTP_400_BAD_REQUEST,"message":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self):
        return Response({"status":"Record Deleted Successfully"},status=status.HTTP_204_NO_CONTENT)

class SignupViewSet(viewsets.ModelViewSet):
    def create(self, request):
        if request.method == "POST":
            if request.POST.get('password1')==request.POST.get('password2'):
                saveuser=User.objects.create_user(request.POST.get('email'), password=request.POST.get('password1'),username=request.POST.get('email') )
                saveuser.save()
                return Response({"status":"Record Created Successfully"},status=status.HTTP_201_CREATED)
            else:
                return Response({"status":status.HTTP_400_BAD_REQUEST},status=status.HTTP_400_BAD_REQUEST)      

class LoginViewSet(viewsets.ModelViewSet):
    def create(self, request):             
        if request.method=="POST":
            loginsuccess=_Authenticator(request, username=request.POST.get('username'), password=request.POST.get('password'))
            if loginsuccess is None:
                return Response({"status":status.HTTP_400_BAD_REQUEST},status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"status":"Login Successfully"},status=status.HTTP_201_CREATED)

