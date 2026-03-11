from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = [
            "id",
            "dni",
            "user",
            "nombre",
            "apellido",
            "fecha_nacimiento",
            "telefono",
            "email",
            "password",
            "rol",
            "foto"
        ]

        extra_kwargs = {
            "password": {"write_only": True}
        }
        
class UsuarioAdminSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = [
            "id",
            "dni",
            "nombre",
            "apellido",
            "email",
            "rol",
            "creditos",
            "activo"
        ]