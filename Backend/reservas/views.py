from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db import transaction

from .models import Inscripcion, Estado
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

        # 🔴 VALIDAR CRÉDITOS DEL USUARIO
        if usuario.creditos <= 0:
            return Response(
                {"error": "No tienes créditos disponibles para reservar"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # buscar si ya existe una inscripción
        inscripcion_existente = Inscripcion.objects.filter(
            usuario=usuario,
            turno=turno
        ).first()

        # si ya está confirmada
        if inscripcion_existente and inscripcion_existente.estado == Estado.CONFIRMADA:
            return Response(
                {"error": "Ya estás inscripto en este turno"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # validar cupos del turno
        if turno.cupos_disponibles <= 0:
            return Response(
                {"error": "No hay cupos disponibles"},
                status=status.HTTP_400_BAD_REQUEST
            )

        with transaction.atomic():

            # restar cupo al turno
            turno.cupos_disponibles -= 1
            turno.save()

            # restar crédito al usuario
            usuario.creditos -= 1
            usuario.save()

            if inscripcion_existente:
                # reactivar inscripción cancelada
                inscripcion_existente.estado = Estado.CONFIRMADA
                inscripcion_existente.save()
                reserva = inscripcion_existente
            else:
                # crear inscripción nueva
                reserva = Inscripcion.objects.create(
                    usuario=usuario,
                    turno=turno,
                    estado=Estado.CONFIRMADA
                )

        serializer = ReservaSerializer(reserva)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


# ======================
# ❌ CANCELAR INSCRIPCIÓN
# ======================

class CancelarInscripcion(APIView):

    def patch(self, request, pk):

        inscripcion = get_object_or_404(Inscripcion, pk=pk)

        if inscripcion.estado == Estado.CANCELADA:
            return Response(
                {"error": "La inscripción ya está cancelada"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # cancelar inscripción
        inscripcion.estado = Estado.CANCELADA
        inscripcion.save()

        turno = inscripcion.turno

        # devolver cupo al turno
        turno.cupos_disponibles += 1
        turno.save()

        # devolver crédito al usuario
        usuario = inscripcion.usuario
        usuario.creditos += 1
        usuario.save()

        return Response({"mensaje": "Inscripción cancelada correctamente"})
