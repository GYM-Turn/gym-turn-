import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Imprescindible para standalone
import { ActividadesService } from './services/actividades-service'; // Ojo: verifica el nombre del archivo .ts
import { ActividadAdminDTO } from '../../models/actividad-admin-dto';
import { ActividadesForm } from './actividades-form/actividades-form';
import { NavAdmin } from '../../componentes-compartidos/nav-admin/nav-admin';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { TurnoService } from '../turnos/services/turnos-services';



@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [CommonModule, ActividadesForm,NavAdmin,Footer], // Agregamos CommonModule aquí
  templateUrl: './actividades.html',
  styleUrl: './actividades.css',
})
export class Actividades implements OnInit {
  private actividadService = inject(ActividadesService);
private turnoService = inject(TurnoService);

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

  const nuevaActiva = !a.activa;

  const actualizada = { ...a, activa: nuevaActiva };

  this.actividadService.updateActividad(a.id!, actualizada)
    .subscribe(() => {

      // 🔥 Si la desactivamos
      if (!nuevaActiva) {

        this.turnoService.getTurnos()
          .subscribe(turnos => {

            const turnosDeActividad = turnos.filter(t => t.actividad.id === a.id);

            turnosDeActividad.forEach(t => {

              const turnoActualizado = { ...t, activo: false };

              this.turnoService.updateTurno(t.id, turnoActualizado)
                .subscribe();

            });

          });
      }

      this.cargarActividades();
    });
}
  eliminarActividad(id: string) {
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