"""Módulo que define los roles de usuario para el sistema de permisos."""
from django.db import models

# Modelo de usuario
class Rol(models.IntegerChoices):
    """Opciones de roles disponibles para los usuarios del sistema."""
    USUARIO = 1, "USUARIO"
    ADMINISTRADOR = 2, "ADMINISTRADOR"
