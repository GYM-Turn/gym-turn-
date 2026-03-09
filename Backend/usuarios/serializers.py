class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"


class UsuarioAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "id",
            "dni",
            "nombre",
            "apellido",
            "email",
            "rol",
            "creditos",
            "activo"
        ]