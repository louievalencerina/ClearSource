from django.urls import path
from .views import ReservationsAPI

urlpatterns = [
    # url for Put and Delete
    path('reservations/<int:id>', ReservationsAPI.as_view()),
    # url for Post and Get
    path('reservations/', ReservationsAPI.as_view())
]
