from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Inscripcion
from .serializers import ReservaSerializer
from clases.models import Turno
from usuarios.models import Usuario

class CrearReserva(APIView):

    def post(self, request):

        usuario_id = request.data.get("usuario")
        turno_id = request.data.get("turno")

        usuario = Usuario.objects.get(id=usuario_id)
        turno = Turno.objects.get(id=turno_id)

        if turno.cupos_disponibles <= 0:
            return Response({"error": "No hay cupos disponibles"})

        turno.cupos_disponibles -= 1
        turno.save()

        reserva = Inscripcion.objects.create(
            usuario=usuario,
            turno=turno
        )

        serializer = ReservaSerializer(reserva)

        return Response(serializer.data)