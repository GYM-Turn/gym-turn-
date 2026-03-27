from django.contrib import admin
from .models import Inscripcion

@admin.register(Inscripcion)
class InscripcionAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'turno', 'estado', 'fecha')
    list_filter = ('estado', 'fecha', 'turno__actividad')
    search_fields = ('usuario__nombre', 'usuario__apellido', 'usuario__dni')