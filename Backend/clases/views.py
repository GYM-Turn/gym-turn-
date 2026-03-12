from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Actividad, Sucursal, Turno
from .serializers import ActividadSerializer, SucursalSerializer, TurnoSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView


class ActividadDetail(RetrieveUpdateDestroyAPIView):
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer
class ActividadList(APIView):

    def get(self, request):
        actividades = Actividad.objects.all()
        serializer = ActividadSerializer(actividades, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ActividadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
class SucursalList(APIView):

    def get(self, request):
        sucursales = Sucursal.objects.all()
        serializer = SucursalSerializer(sucursales, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SucursalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class SucursalDetail(RetrieveUpdateDestroyAPIView):
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer
class TurnoList(APIView):

    def get(self, request):
        turnos = Turno.objects.all()
        serializer = TurnoSerializer(turnos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TurnoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)