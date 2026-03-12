import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { InscripcionService } from '../../usuario/dashboard/services/inscripcion-service';
import { TurnoService } from '../../admin/turnos/services/turnos-services';
import { Inscripcion } from '../../models/inscripcion.model';
import { Turno } from '../../models/turno';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { NavUsuario } from "../../componentes-compartidos/nav-usuario/nav-usuario";

@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard.html',
  imports: [Footer, NavUsuario],
  styleUrls: ['./dashboard.css']
})
export class DashboardUsuario implements OnInit {

  usuarioId!: number;
  usuarioNombre: string = '';

  inscripciones: Inscripcion[] = [];
  turnos: Turno[] = [];

  totalTurnos: number = 0;

  constructor(
    private authService: AuthService,
    private inscripcionService: InscripcionService,
    private turnoService: TurnoService
  ) {}

  ngOnInit(): void {

    const usuario = this.authService.getUsuarioActual();
    if (!usuario) return;

    this.usuarioId = Number(usuario.id);
    this.usuarioNombre = usuario.nombre;

    this.cargarInscripciones();
  }

  cargarInscripciones(): void {

    this.inscripcionService
      .getInscripcionesByUsuario(this.usuarioId)
      .subscribe(data => {

        this.inscripciones = data;
        this.totalTurnos = data.length;

        this.cargarTurnos();
      });
  }

  cargarTurnos(): void {

    this.turnos = [];

    this.inscripciones.forEach(inscripcion => {

      this.turnoService
        .getTurnoById(inscripcion.id_turno)
        .subscribe(turno => {
          this.turnos.push(turno);
        });

    });
  }

  cancelarInscripcion(id: number): void {

    this.inscripcionService
      .cancelarInscripcion(id)
      .subscribe(() => {
        this.cargarInscripciones();
      });
  }
}