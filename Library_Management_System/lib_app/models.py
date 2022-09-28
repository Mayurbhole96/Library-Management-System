from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Book(models.Model):
    id = models.AutoField(primary_key=True)
    book_name = models.CharField(max_length=20,verbose_name='Book Name')
    book_author = models.CharField(max_length=20,verbose_name='Book Auther')
    is_deleted = models.BooleanField(default=False, verbose_name="Is Deleted")
    is_active = models.BooleanField(default=True, verbose_name="Is Active")
    created_date_time = models.DateTimeField(
        verbose_name="Created Date Time", auto_now_add=True)
    updated_date_time = models.DateTimeField(
        verbose_name="Updated Date Time", auto_now_add=False) 

    class Meta:
        db_table = "tbl_book_mst"

    def delete(self):
        self.is_deleted = True
        self.is_active = False
        self.save()