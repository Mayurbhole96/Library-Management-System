from rest_framework import serializers
from lib_app.models import Book

class BookGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id','book_name','book_author')

class BookSerializer(serializers.ModelSerializer):
    def validate(self, data):
        if self.instance==None and Book.objects.filter(book_name=data['book_name'], is_active=True, is_deleted=False).exists():
            raise serializers.ValidationError("Book already exists")
        elif self.instance!=None:
            if self.instance.id and Book.objects.filter(book_name=data['book_name'], is_active=True, is_deleted=False).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("Book already exists")
        return data    

    class Meta:
        model = Book
        fields = ('__all__')
     