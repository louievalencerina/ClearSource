# Generated by Django 4.2.5 on 2023-09-28 05:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ReservationsApp', '0003_remove_reservation_user_reservation_phone_number_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]
