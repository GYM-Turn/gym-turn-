import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionService } from '../dashboard/services/inscripcion-service';
import { TurnoService } from '../../admin/turnos/services/turnos-services';
import { AuthService } from '../../servicios/auth.service';
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
    private inscripcionService: InscripcionService,
    private turnoService: TurnoService,
    private authService: AuthService
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
      .subscribe((inscripciones: any[]) => {

        const idsTurnos = inscripciones.map(i => i.turno.id);

        this.turnoService.getTurnos().subscribe((turnos) => {

          this.misTurnos = turnos.filter(
            turno => idsTurnos.includes(turno.id!)
          );

        });

      });

  }

  cancelarTurno(turno: Turno): void {

    this.inscripcionService
      .getInscripcionesPorUsuarioYTurno(this.userId, turno.id!)
      .subscribe((inscripciones) => {

        if (inscripciones.length === 0) return;

        const inscripcion = inscripciones[0];

        this.inscripcionService
          .cancelarInscripcion(inscripcion.id!)
          .subscribe(() => {

            alert('Turno cancelado correctamente');
            this.cargarMisTurnos();

          });

      });

  }

}
