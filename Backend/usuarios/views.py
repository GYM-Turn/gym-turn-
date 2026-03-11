from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializers import UsuarioSerializer
from django.contrib.auth.hashers import make_password, check_password


class UsuarioListCreateView(APIView):

    def get(self, request):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)

    def post(self, request):

        data = request.data.copy()

        if 'password' in data:
            data['password'] = make_password(data['password'])

        serializer = UsuarioSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

class UsuarioDetailView(APIView):

    def get_object(self, id):
        return get_object_or_404(Usuario, id=id)

    def get(self, request, id):
        usuario = self.get_object(id)
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)

    def put(self, request, id):
        usuario = self.get_object(id)
        serializer = UsuarioSerializer(usuario, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def patch(self, request, id):

        usuario = self.get_object(id)

        data = request.data.copy()

        if 'password' in data:
            data['password'] = make_password(data['password'])

        serializer = UsuarioSerializer(usuario, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def delete(self, request, id):
        usuario = self.get_object(id)
        usuario.delete()
        return Response(status=204)

class LoginView(APIView):

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")

        try:
            usuario = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=404)

        if check_password(password, usuario.password):

            serializer = UsuarioSerializer(usuario)

            return Response(serializer.data)

        return Response({"error": "Contraseña incorrecta"}, status=401)