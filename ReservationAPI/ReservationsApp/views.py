from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Reservation
from .serializers import ReservationsSerializer


class ReservationsAPI(APIView):
    def get(self, request, id=0):
        if id == 0:  # For getting individual reservations
            reservations = Reservation.objects.all()
            reservation_DTO = ReservationsSerializer(reservations, many=True)
            return Response(reservation_DTO.data)
        else:  # for getting all reservations
            try:
                reservation = Reservation.objects.get(ID=id)
                reservation_DTO = ReservationsSerializer(reservation)
                return Response(reservation_DTO.data)
            except Reservation.DoesNotExist:
                return Response("Reservation not found", status=status.HTTP_404_NOT_FOUND)

    def post(self, request):  # for adding reservations
        reservation_DTO = ReservationsSerializer(data=request.data)
        if reservation_DTO.is_valid():  # checks if the serialized request is valid
            reservation_DTO.save()  # saves the data to the db if valid
            return Response("Reservation Added Successfully", status=status.HTTP_201_CREATED)
        return Response(reservation_DTO.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        try:
            # gets id through the url parameters
            reservation = Reservation.objects.get(ID=id)
        except Reservation.DoesNotExist:  # checks if reservation exists
            return Response("Reservation not found", status=status.HTTP_404_NOT_FOUND)
        reservation_DTO = ReservationsSerializer(
            reservation, data=request.data)
        if reservation_DTO.is_valid():  # checks if reservation object is valid
            reservation_DTO.save()  # updates reservation based on id if request is valid
            return Response("Updated Reservation")
        return Response(reservation_DTO.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            # gets reservation id based on url parameter
            reservation = Reservation.objects.get(ID=id)
        except Reservation.DoesNotExist:
            return Response("Reservation not found", status=status.HTTP_404_NOT_FOUND)

        reservation.delete()  # Deletes reservation
        return Response("Deleted Successfully")
