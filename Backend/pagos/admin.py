from django.contrib import admin
from .models import Pago

@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'monto', 'creditos', 'metodo_pago', 'confirmado', 'fecha')
    list_filter = ('confirmado', 'metodo_pago', 'fecha')
    search_fields = ('usuario__nombre', 'usuario__dni')