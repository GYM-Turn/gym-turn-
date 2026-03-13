from django.urls import path
from .views import ReservaListCreate

urlpatterns = [
    path("inscripciones/", ReservaListCreate.as_view()),
]