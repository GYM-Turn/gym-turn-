import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoService } from '../../admin/turnos/services/turnos-services';
import { InscripcionService } from '../dashboard/services/inscripcion-service';
import { AuthService } from '../../servicios/auth.service';
import { ActividadesService } from '../../admin/actividades/services/actividades-service';
import { Turno } from '../../models/turno';
import { NavUsuario } from '../../componentes-compartidos/nav-usuario/nav-usuario';
import { Footer } from '../../componentes-compartidos/footer/footer';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, NavUsuario, Footer],
  templateUrl: './mis-turnos.html',
  styleUrls: ['./mis-turnos.css'],
})
export class MisTurnos implements OnInit {

  misTurnos: Turno[] = [];
  userId!: number;

  constructor(
    private turnoService: TurnoService,
    private inscripcionService: InscripcionService,
    private authService: AuthService,
    private actividadService: ActividadesService,
  ) {}

  ngOnInit(): void {

    const usuario = this.authService.getUsuarioActual();

    if (!usuario?.id) {
      alert('Debe iniciar sesión');
      return;
    }

    this.userId = usuario.id;
    this.cargarMisTurnos();
  }

  cargarMisTurnos(): void {

    this.inscripcionService
      .getInscripcionesByUsuario(this.userId)
      .subscribe((misInscripciones) => {

        this.turnoService.getTurnos().subscribe((turnos) => {

          this.actividadService.getActividades().subscribe((actividades) => {

            this.misTurnos = turnos
              .filter((t) => misInscripciones.some((i) => i.id_turno === t.id!))
              .map((turno) => {

                const actividadReal = actividades.find(
                  (a) => a.id === turno.actividad?.id
                );

                return {
                  ...turno,
                  actividad: actividadReal ?? turno.actividad,
                };

              });

          });

        });

      });

  }

  cancelarTurno(turno: Turno): void {

    this.inscripcionService
      .getInscripcionesPorUsuarioYTurno(this.userId, turno.id!)
      .subscribe((inscripciones) => {

        if (inscripciones.length === 0) return;

        const inscripcion = inscripciones[0];

        // 1️⃣ cancelar inscripción
        this.inscripcionService
          .cancelarInscripcion(inscripcion.id!)
          .subscribe(() => {

            // 2️⃣ liberar cupo
            const turnoActualizado: Turno = {
              ...turno,
              cupos_disponibles: turno.cupos_disponibles + 1,
            };

            this.turnoService
              .updateTurno(turno.id!, turnoActualizado)
              .subscribe(() => {

                alert('Turno cancelado correctamente');
                this.cargarMisTurnos();

              });

          });

      });

  }

}