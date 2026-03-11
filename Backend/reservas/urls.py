from django.urls import path
from .views import CrearReserva

urlpatterns = [

    path("inscripcion/", CrearReserva.as_view()),

]