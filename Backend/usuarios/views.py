from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Usuario
from .serializers import UsuarioSerializer, UsuarioAdminSerializer

from django.contrib.auth.hashers import make_password, check_password


class UsuarioListCreateView(APIView):

    # ==========================
    # 👤 LISTAR USUARIOS (ADMIN)
    # ==========================
    def get(self, request):
        usuarios = Usuario.objects.all()
        serializer = UsuarioAdminSerializer(usuarios, many=True)
        return Response(serializer.data)

    # ==========================
    # 👤 CREAR USUARIO
    # ==========================
    def post(self, request):

        data = request.data.copy()

        # valores por defecto para campos que no vienen del admin
        data["user"] = data.get("email")

        # 🔐 contraseña automática = DNI
        data["password"] = make_password(data["dni"])

        data["telefono"] = "000000000"
        data["fecha_nacimiento"] = "2000-01-01"

        serializer = UsuarioSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class UsuarioDetailView(APIView):

    def get_object(self, id):
        return get_object_or_404(Usuario, id=id)

    # ==========================
    # 👤 OBTENER USUARIO
    # ==========================
    def get(self, request, id):
        usuario = self.get_object(id)
        serializer = UsuarioAdminSerializer(usuario)
        return Response(serializer.data)

    # ==========================
    # ✏️ ACTUALIZAR USUARIO (ADMIN)
    # ==========================
    def put(self, request, id):

        usuario = self.get_object(id)

        serializer = UsuarioAdminSerializer(
            usuario,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    # ==========================
    # ✏️ PATCH USUARIO
    # ==========================
    def patch(self, request, id):

        usuario = self.get_object(id)

        data = request.data.copy()

        # 🔐 Si actualizan password se vuelve a hashear
        if 'password' in data:
            data['password'] = make_password(data['password'])

        serializer = UsuarioSerializer(
            usuario,
            data=data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    # ==========================
    # 🗑 ELIMINAR USUARIO
    # ==========================
    def delete(self, request, id):
        usuario = self.get_object(id)
        usuario.delete()
        return Response(status=204)


# ==========================
# 🔐 LOGIN
# ==========================
class LoginView(APIView):

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")

        try:
            usuario = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return Response(
                {"error": "Usuario no encontrado"},
                status=404
            )

        # 🚫 usuario desactivado no puede entrar
        if not usuario.activo:
            return Response(
                {"error": "Usuario desactivado"},
                status=403
            )

        # 🔐 validar contraseña hasheada
        if check_password(password, usuario.password):

            serializer = UsuarioSerializer(usuario)

            return Response(serializer.data)

        return Response(
            {"error": "Contraseña incorrecta"},
            status=401
        )