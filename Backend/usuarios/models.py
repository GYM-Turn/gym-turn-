from django.db import models

class Rol(models.IntegerChoices):
    USUARIO = 1, "USUARIO"
    ADMINISTRADOR = 2, "ADMINISTRADOR"


class Usuario(models.Model):

    dni = models.CharField(max_length=20, unique=True)
    user = models.CharField(max_length=100)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    rol = models.IntegerField(choices=Rol.choices)

    foto = models.ImageField(upload_to="usuarios/", null=True, blank=True)

    creditos = models.IntegerField(default=0)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"