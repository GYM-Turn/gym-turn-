from django.urls import path
from .views import ReservaListCreate, CancelarInscripcion

urlpatterns = [
    path("inscripciones/", ReservaListCreate.as_view()),
    path('inscripciones/<int:pk>/', CancelarInscripcion.as_view()),
]