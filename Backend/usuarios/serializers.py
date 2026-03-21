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

# 🔥 REGISTRO (FRONT)
class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = [
            "dni",
            "nombre",
            "apellido",
            "fecha_nacimiento",
            "telefono",
            "email",
            "password"
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')

        usuario = Usuario(**validated_data)

        usuario.user = usuario.email
        usuario.password = make_password(password)

        usuario.rol = 1
        usuario.activo = True

        usuario.save()
        return usuario


# 🔥 ADMIN (CORREGIDO)
class UsuarioAdminSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = [
            "id",
            "dni",
            "nombre",
            "apellido",
            "email",
            "fecha_nacimiento",   # 👈 AHORA OBLIGATORIO DESDE FORM
            "rol",
            "creditos",
            "activo"
        ]

    def create(self, validated_data):

        dni = validated_data.get("dni")

        usuario = Usuario(**validated_data)

        # 🔐 contraseña automática
        usuario.password = make_password(dni)

        # 🔥 completar campos faltantes
        usuario.user = usuario.email
        usuario.telefono = "000000000"  # 👈 DEFAULT

        usuario.save()
        return usuario