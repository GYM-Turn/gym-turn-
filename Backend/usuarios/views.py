from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Usuario
from .serializers import UsuarioSerializer, UsuarioAdminSerializer, RegisterSerializer

from django.contrib.auth.hashers import check_password


# ==========================
# 👤 LISTAR Y CREAR (ADMIN)
# ==========================

class UsuarioListCreateView(APIView):

    def get(self, request):
        usuarios = Usuario.objects.all()
        serializer = UsuarioAdminSerializer(usuarios, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UsuarioAdminSerializer(data=request.data)

        if serializer.is_valid():
            usuario = serializer.save()
            return Response(UsuarioAdminSerializer(usuario).data, status=201)

        return Response(serializer.errors, status=400)


# ==========================
# 🔥 REGISTRO REAL (FRONT)
# ==========================
class RegisterView(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            usuario = serializer.save()  # 👈 YA hashea password adentro

            return Response(
                UsuarioSerializer(usuario).data,
                status=201
            )

        return Response(serializer.errors, status=400)


# ==========================
# 👤 DETALLE
# ==========================
class UsuarioDetailView(APIView):

    def get_object(self, id):
        return get_object_or_404(Usuario, id=id)

    def get(self, request, id):
        usuario = self.get_object(id)
        serializer = UsuarioAdminSerializer(usuario)
        return Response(serializer.data)

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

    def patch(self, request, id):
        usuario = self.get_object(id)

        data = request.data.copy()

        # 🔐 si cambian password
        if 'password' in data:
            from django.contrib.auth.hashers import make_password
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
            return Response({"error": "Usuario no encontrado"}, status=404)

        if not usuario.activo:
            return Response({"error": "Usuario desactivado"}, status=403)

        if check_password(password, usuario.password):
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data)

        return Response({"error": "Contraseña incorrecta"}, status=401)