from django.urls import path
from .views import ComprarCreditosView, HistorialPagosView, MisPagosView

urlpatterns = [

    path('comprar-creditos/', ComprarCreditosView.as_view(), name='comprar_creditos'),

    path('historial/', HistorialPagosView.as_view(), name='historial_pagos'),

    path('mis-pagos/', MisPagosView.as_view(), name='mis_pagos'),

]