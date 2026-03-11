from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Pago
from .serializers import PagoSerializer


class HistorialPagosView(APIView):

    def get(self, request):
        pagos = Pago.objects.all()
        serializer = PagoSerializer(pagos, many=True)
        return Response(serializer.data)


class MisPagosView(APIView):

    def get(self, request):
        usuario = request.user
        pagos = Pago.objects.filter(usuario=usuario)

        serializer = PagoSerializer(pagos, many=True)
        return Response(serializer.data)


class ComprarCreditosView(APIView):

    def post(self, request):

        serializer = PagoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(usuario=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)