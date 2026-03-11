from django.db import models
from usuarios.models import Usuario
from clases.models import Turno


class Estado(models.IntegerChoices):

    CONFIRMADA = 1, "CONFIRMADA"
    CANCELADA = 2, "CANCELADA"
    RECHAZADA = 3, "RECHAZADA"


class Inscripcion(models.Model):

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