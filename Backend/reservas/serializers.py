from rest_framework import serializers
from .models import Inscripcion
from clases.models import Turno

class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = '__all__'


class ReservaSerializer(serializers.ModelSerializer):

    turno = TurnoSerializer(read_only=True)

    class Meta:
        model = Inscripcion
        fields = '__all__'