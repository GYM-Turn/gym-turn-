from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db import transaction

from .models import Inscripcion
from .serializers import ReservaSerializer
from clases.models import Turno
from usuarios.models import Usuario


class ReservaListCreate(APIView):

    # ======================
    # 🔎 BUSCAR RESERVAS
    # ======================
    def get(self, request):

        usuario_id = request.GET.get("id_usuario")
        turno_id = request.GET.get("id_turno")
        estado = request.GET.get("estado")

        reservas = Inscripcion.objects.all()

        if usuario_id:
            reservas = reservas.filter(usuario_id=usuario_id)

        if turno_id:
            reservas = reservas.filter(turno_id=turno_id)

        if estado:
            reservas = reservas.filter(estado=estado)

        serializer = ReservaSerializer(reservas, many=True)

        return Response(serializer.data)

    # ======================
    # 📅 CREAR RESERVA
    # ======================
    def post(self, request):

        usuario_id = request.data.get("id_usuario")
        turno_id = request.data.get("id_turno")

        if not usuario_id or not turno_id:
            return Response(
                {"error": "Faltan datos para crear la reserva"},
                status=status.HTTP_400_BAD_REQUEST
            )

        usuario = get_object_or_404(Usuario, id=usuario_id)
        turno = get_object_or_404(Turno, id=turno_id)

        # 🔴 validar duplicado
        if Inscripcion.objects.filter(usuario=usuario, turno=turno, estado=1).exists():
            return Response(
                {"error": "Ya estás inscripto en este turno"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 🔴 validar cupos
        if turno.cupos_disponibles <= 0:
            return Response(
                {"error": "No hay cupos disponibles"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 🔒 transacción para evitar sobreventa
        with transaction.atomic():

            turno.cupos_disponibles -= 1
            turno.save()

            reserva = Inscripcion.objects.create(
                usuario=usuario,
                turno=turno,
                estado=1
            )

        serializer = ReservaSerializer(reserva)

        return Response(serializer.data, status=status.HTTP_201_CREATED)