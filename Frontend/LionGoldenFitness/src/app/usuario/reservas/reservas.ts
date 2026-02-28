import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoService } from '../../admin/turnos/services/turnos-services';
import { InscripcionService } from '../../usuario/dashboard/services/inscripcion-service';
import { AuthService } from '../../servicios/auth.service';
import { ActividadesService } from '../../admin/actividades/services/actividades-service';
import { Turno } from '../../models/turno';
import { NavUsuario } from '../../componentes-compartidos/nav-usuario/nav-usuario';
import { Footer } from '../../componentes-compartidos/footer/footer';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule,NavUsuario,Footer],
  templateUrl: './reservas.html',
  styleUrls: ['./reservas.css']
})
export class Reservas implements OnInit {

  turnos: Turno[] = [];

  constructor(
    private turnoService: TurnoService,
    private inscripcionService: InscripcionService,
    private authService: AuthService,
    private actividadService: ActividadesService
  ) {}

  ngOnInit(): void {
    this.cargarTurnos();
  }
cargarTurnos(): void {

  this.turnoService.getTurnos().subscribe(turnos => {

    this.actividadService.getActividades().subscribe(actividades => {

      this.turnos = turnos.map(turno => {

        const actividadReal = actividades.find(a => a.id === turno.actividad.id);

        return {
          ...turno,
          actividad: actividadReal!
        };

      });

    });

  });

}
reservar(turno: Turno): void {

  const usuario = this.authService.getUsuarioActual();
  if (!usuario) {
    alert('Debe iniciar sesión');
    return;
  }

  // 🔴 1️⃣ Validar actividad activa
  if (!turno.actividad.activa) {
    alert('La actividad está desactivada');
    return;
  }

  // 🔴 2️⃣ Validar turno activo
  if (!turno.activo) {
    alert('Este turno está desactivado');
    return;
  }

  // 🔴 3️⃣ Validar cupos
  if (turno.cupos_disponibles <= 0) {
    alert('No hay cupos disponibles');
    return;
  }

  // 🔴 4️⃣ Validar si ya está inscripto
  this.inscripcionService
    .getInscripcionesPorUsuarioYTurno(usuario.id!, turno.id)
    .subscribe(inscripciones => {

      if (inscripciones.length > 0) {
        alert('Ya estás inscripto en este turno');
        return;
      }

      // ✅ Crear inscripción
      const nuevaInscripcion = {
        id: Date.now().toString(),
        estado: 1,
        id_usuario: usuario.id!,
        id_turno: turno.id
      };

      this.inscripcionService.crearInscripcion(nuevaInscripcion)
        .subscribe(() => {

          // 🔥 Actualizar cupos
          const turnoActualizado: Turno = {
            ...turno,
            cupos_disponibles: turno.cupos_disponibles - 1
          };

          this.turnoService.updateTurno(turno.id, turnoActualizado)
            .subscribe(() => {
              alert('Reserva realizada con éxito');
              this.cargarTurnos(); // recarga vista
            });

        });

    });
}}