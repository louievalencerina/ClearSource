from rest_framework import serializers
from ReservationsApp.models import Reservation


class ReservationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'  # Gets all fields of model Reservation
