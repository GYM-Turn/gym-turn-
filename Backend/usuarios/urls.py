from django.urls import path
from .views import UsuarioListCreateView, UsuarioDetailView, LoginView, RegisterView

urlpatterns = [

    path("usuarios/", UsuarioListCreateView.as_view()),
    path("usuarios/<int:id>/", UsuarioDetailView.as_view()),
    path("login/", LoginView.as_view()),
    path("register/", RegisterView.as_view()),
]