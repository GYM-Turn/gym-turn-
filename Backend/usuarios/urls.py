from django.urls import path
from .views import UsuarioListCreateView, UsuarioDetailView, LoginView

urlpatterns = [

    path("usuarios/", UsuarioListCreateView.as_view()),
    path("usuarios/<int:id>/", UsuarioDetailView.as_view()),
    path("login/", LoginView.as_view()),

]