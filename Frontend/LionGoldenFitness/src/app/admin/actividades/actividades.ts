import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Imprescindible para standalone
import { ActividadesService } from './services/actividades-service'; // Ojo: verifica el nombre del archivo .ts
import { ActividadAdminDTO } from '../../models/actividad-admin-dto';
import { ActividadesForm } from './actividades-form/actividades-form';



@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [CommonModule, ActividadesForm], // Agregamos CommonModule aquí
  templateUrl: './actividades.html',
  styleUrl: './actividades.css',
})
export class Actividades implements OnInit {
  private actividadService = inject(ActividadesService);

  actividades: ActividadAdminDTO[] = [];
  mostrarFormulario = false;
  actividadSeleccionada?: ActividadAdminDTO;

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades() {
    this.actividadService.getActividades()
      .subscribe(data => this.actividades = data);
  }

  nuevaActividad() {
    this.actividadSeleccionada = undefined;
    this.mostrarFormulario = true;
  }

  editarActividad(a: ActividadAdminDTO) {
    this.actividadSeleccionada = a;
    this.mostrarFormulario = true;
  }

  toggleEstado(a: ActividadAdminDTO) {
    const actualizada = { ...a, activa: !a.activa };
    this.actividadService.updateActividad(a.id!, actualizada)
      .subscribe(() => this.cargarActividades());
  }

  eliminarActividad(id: number) {
    this.actividadService.deleteActividad(id)
      .subscribe(() => this.cargarActividades());
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.cargarActividades();
  }

  getEstadoCupos(a: ActividadAdminDTO): string {
    if (!a.activa) return 'Inactiva';
    if (a.cupos_ocupados >= a.cupos) return 'Completo';
    return 'Disponible';
  }
}