from django.urls import path
from .views import ActividadList, SucursalList, TurnoList

urlpatterns = [

    path("actividades/", ActividadList.as_view()),
    path("sucursales/", SucursalList.as_view()),
    path("turnos/", TurnoList.as_view()),

]
