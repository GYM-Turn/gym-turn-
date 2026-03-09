"""Modelos para la gestión de usuarios e inscripciones a turnos."""
from django.db import models
from usuarios.models import Rol
from clases.models import Turno


class Estado(models.IntegerChoices):
    """Opciones de estado para una inscripción."""
    CONFIRMADA = 1, "CONFIRMADA"
    CANCELADA = 2, "CANCELADA"
    RECHAZADA = 3, "RECHAZADA"


class Usuario(models.Model):
    """Representa a un usuario del sistema con sus datos personales y créditos."""

    dni = models.CharField(max_length=20, unique=True)
    user = models.CharField(max_length=100)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    rol = models.IntegerField(choices=Rol.choices)
    foto = models.CharField(max_length=255, null=True, blank=True)
    creditos = models.IntegerField(default=0)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"


class Inscripcion(models.Model):
    """Vincula a un usuario con un turno específico y rastrea su estado."""

    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE
    )
    turno = models.ForeignKey(
        Turno,
        on_delete=models.CASCADE
    )
    estado = models.IntegerField(
        choices=Estado.choices,
        default=Estado.CONFIRMADA
    )
    fecha = models.DateTimeField(auto_now_add=True)
