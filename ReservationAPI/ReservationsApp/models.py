from django.db import models

# Create your models here.


class Reservation(models.Model):
    ID = models.AutoField(primary_key=True)
    reservation_first_name = models.CharField(max_length=50)
    reservation_last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=30)
    reservation_datetime = models.DateTimeField()
    number_of_guests = models.IntegerField()
