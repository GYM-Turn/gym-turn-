"""
Módulo para el comando de gestión que crea el administrador inicial del sistema.
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from usuarios.models import Usuario, Rol

# pylint: disable=no-member

class Command(BaseCommand):
    """
    Comando para crear un usuario administrador por defecto si no existe.
    """
    help = "Crea un usuario administrador inicial"

    def handle(self, *args, **options):  # Cambié kwargs por options
        """
        Lógica principal del comando.
        """
        # Evitar error de argumento no usado para 'args'
        _ = args

        email_admin = "admin@liongoldenfitness.com"

        if Usuario.objects.filter(email=email_admin).exists():
            self.stdout.write(self.style.WARNING("El administrador ya existe"))
            return

        admin = Usuario.objects.create(
            dni="00000000",
            user="admin",
            nombre="Administrador",
            apellido="Sistema",
            fecha_nacimiento="1990-01-01",
            telefono="3510000000",
            email=email_admin,
            password=make_password("admin123"),
            rol=Rol.ADMINISTRADOR,
            activo=True,
            creditos=0
        )

        self.stdout.write(
            self.style.SUCCESS(f"Administrador creado correctamente: {admin.email}")
        )