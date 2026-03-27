from django.contrib import admin
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'dni', 'email', 'rol', 'creditos', 'activo')
    list_filter = ('rol', 'activo')
    search_fields = ('nombre', 'apellido', 'dni', 'email')
    # Esto permite ver la foto en el admin si existe
    readonly_fields = ('foto_preview',)

    def foto_preview(self, obj):
        if obj.foto:
            from django.utils.html import format_html
            return format_html('<img src="{}" style="max-width:200px; height:auto;"/>', obj.foto.url)
        return "Sin foto"