from rest_framework import serializers
from .models import Inscripcion


class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscripcion
        fields = "__all__"