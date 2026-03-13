from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.hashers import make_password

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

    def create(self, validated_data):

        dni = validated_data.get("dni")

        usuario = Usuario(**validated_data)

        # 🔥 contraseña automática = DNI
        usuario.password = make_password(dni)

        usuario.save()

        return usuario