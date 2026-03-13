from rest_framework import serializers
from .models import Actividad, Sucursal, Turno


class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = "__all__"


class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = "__all__"


class TurnoSerializer(serializers.ModelSerializer):

    actividad = ActividadSerializer(read_only=True)
    sucursal = SucursalSerializer(read_only=True)

    actividad_id = serializers.PrimaryKeyRelatedField(
        queryset=Actividad.objects.all(),
        source="actividad",
        write_only=True
    )

    sucursal_id = serializers.PrimaryKeyRelatedField(
        queryset=Sucursal.objects.all(),
        source="sucursal",
        write_only=True
    )

    class Meta:
        model = Turno
        fields = [
            "id",
            "actividad",
            "sucursal",
            "actividad_id",
            "sucursal_id",
            "fecha_hora",
            "cupo_maximo",
            "cupos_disponibles"
        ]