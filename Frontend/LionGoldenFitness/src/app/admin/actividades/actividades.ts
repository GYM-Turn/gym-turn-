import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadesService } from './services/actividades-service';
import { ActividadAdminDTO } from '../../models/actividad-admin-dto';
import { ActividadesForm } from './actividades-form/actividades-form';
import { NavAdmin } from '../../componentes-compartidos/nav-admin/nav-admin';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { TurnoService } from '../turnos/services/turnos-services';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [CommonModule, ActividadesForm, NavAdmin, Footer],
  templateUrl: './actividades.html',
  styleUrl: './actividades.css',
})
export class Actividades implements OnInit {

  private actividadService = inject(ActividadesService);
  private turnoService = inject(TurnoService);

  actividades: ActividadAdminDTO[] = [];
  mostrarFormulario = false;
  actividadSeleccionada?: ActividadAdminDTO;

  // 🔥 tipado seguro
  cuposDisponiblesPorActividad: Record<number, number> = {};

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades() {
    this.actividadService.getActividades().subscribe(actividades => {

      this.turnoService.getTurnos().subscribe(turnos => {

        this.actividades = actividades;
        this.cuposDisponiblesPorActividad = {};

        actividades.forEach(a => {

          // 🔥 protección total contra undefined
          const id = a.id;
          if (id === undefined || id === null) return;

          const turnosDeActividad = turnos.filter(
            t => t.actividad.id === id
          );

          const disponibles = turnosDeActividad.reduce(
            (acc, t) => acc + t.cupos_disponibles,
            0
          );

          this.cuposDisponiblesPorActividad[id] = disponibles;
        });

      });

    });
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

    const id = a.id;
    if (id === undefined || id === null) return;

    const nuevaActiva = !a.activa;
    const actualizada = { ...a, activa: nuevaActiva };

    this.actividadService.updateActividad(id, actualizada)
      .subscribe(() => {

        if (!nuevaActiva) {
          this.turnoService.getTurnos()
            .subscribe(turnos => {

              const turnosDeActividad = turnos.filter(
                t => t.actividad.id === id
              );

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

  eliminarActividad(id: number) {
    this.actividadService.deleteActividad(id)
      .subscribe(() => this.cargarActividades());
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.cargarActividades();
  }

  getEstadoCupos(a: ActividadAdminDTO): string {

    const id = a.id;

    if (!a.activa || id === undefined || id === null) {
      return 'Inactiva';
    }

    const disponibles = this.cuposDisponiblesPorActividad[id] ?? 0;

    if (disponibles === 0) return 'Completo';

    return 'Disponible';
  }
}