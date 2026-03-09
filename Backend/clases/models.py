"""Modelos de base de datos para la gestión de actividades y turnos."""
from django.db import models

class Actividad(models.Model):
    """Representa una actividad deportiva o recreativa disponible."""

    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=300)
    cupos = models.IntegerField()
    cupos_ocupados = models.IntegerField(default=0)
    duracion = models.IntegerField()
    activa = models.BooleanField(default=True)

    def __str__(self):
        return str(self.nombre)

class Sucursal(models.Model):
    """Representa una sede física donde se realizan actividades."""

    nombre_sucursal = models.CharField(max_length=100)
    direccion = models.CharField(max_length=150)

    def __str__(self):
        return str(self.nombre_sucursal)

class Turno(models.Model):
    """Representa un horario específico para una actividad en una sucursal."""

    actividad = models.ForeignKey(
        Actividad,
        on_delete=models.CASCADE,
        related_name="turnos"
    )
    sucursal = models.ForeignKey(
        Sucursal,
        on_delete=models.CASCADE
    )
    fecha_hora = models.DateTimeField()
    cupo_maximo = models.IntegerField()
    cupos_disponibles = models.IntegerField()
