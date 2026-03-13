from django.urls import path
from .views import ActividadList, ActividadDetail, SucursalList, SucursalDetail, TurnoList, TurnoDetail

urlpatterns = [

    path("actividades/", ActividadList.as_view()),
    path("actividades/<int:pk>/", ActividadDetail.as_view()),

    path("sucursales/", SucursalList.as_view()),
    path("sucursales/<int:pk>/", SucursalDetail.as_view()),

    path("turnos/", TurnoList.as_view()),
    path("turnos/<int:pk>/", TurnoDetail.as_view()),
]