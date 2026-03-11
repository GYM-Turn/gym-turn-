from django.db import models
from usuarios.models import Usuario


class Pago(models.Model):

    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE
    )

    monto = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    creditos = models.IntegerField()

    fecha = models.DateTimeField(
        auto_now_add=True
    )

    metodo_pago = models.CharField(
        max_length=50
    )

    confirmado = models.BooleanField(
        default=True
    )

    def __str__(self):
        return f"Pago {self.usuario} - ${self.monto}"