from django.contrib import admin
from .models import Actividad, Sucursal, Turno

@admin.register(Actividad)
class ActividadAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'cupos', 'cupos_ocupados', 'activa')
    list_filter = ('activa',)
    search_fields = ('nombre',)

@admin.register(Sucursal)
class SucursalAdmin(admin.ModelAdmin):
    list_display = ('nombre_sucursal', 'direccion')

@admin.register(Turno)
class TurnoAdmin(admin.ModelAdmin):
    list_display = ('actividad', 'sucursal', 'fecha_hora', 'cupos_disponibles')
    list_filter = ('sucursal', 'actividad', 'fecha_hora')
    date_hierarchy = 'fecha_hora' # Agrega una barra de navegación por fechas