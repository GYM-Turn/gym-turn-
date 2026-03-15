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
  imports: [CommonModule, NavUsuario, Footer],
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

          const actividadReal = actividades.find(a => a.id === turno.actividad?.id);

          return {
            ...turno,
            actividad: actividadReal ?? turno.actividad
          };

        });

      });

    });

  }

 reservar(turno: Turno) {

  const usuario = this.authService.getUsuarioActual();

  if (!usuario?.id) {
    alert("Debe iniciar sesión");
    return;
  }

  const reserva = {
    id_usuario: usuario.id!,   // ! asegura que no es undefined
    id_turno: turno.id!,
    estado: 1                  // CONFIRMADA
  };

  this.inscripcionService.crearInscripcion(reserva).subscribe({

    next: () => {
      alert("Turno reservado correctamente");
      this.cargarTurnos();
    },

    error: (error) => {
      console.error("ERROR AL RESERVAR:", error);

      if (error.error?.error) {
        alert(error.error.error);
      } else {
        alert("Error al reservar turno");
      }

    }

  });

}




}