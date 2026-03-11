from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from usuarios.models import Usuario, Rol


class Command(BaseCommand):
    help = "Crea un usuario administrador inicial"

    def handle(self, *args, **kwargs):

        if Usuario.objects.filter(email="admin@liongoldenfitness.com").exists():
            self.stdout.write(self.style.WARNING("El administrador ya existe"))
            return

        admin = Usuario.objects.create(
            dni="00000000",
            user="admin",
            nombre="Administrador",
            apellido="Sistema",
            fecha_nacimiento="1990-01-01",
            telefono="3510000000",
            email="admin@liongoldenfitness.com",
            password=make_password("admin123"),
            rol=Rol.ADMINISTRADOR,
            activo=True,
            creditos=0
        )

        self.stdout.write(
            self.style.SUCCESS(f"Administrador creado correctamente: {admin.email}")
        )