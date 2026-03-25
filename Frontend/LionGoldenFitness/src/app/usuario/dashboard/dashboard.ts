import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { InscripcionService } from '../../usuario/dashboard/services/inscripcion-service';
import { TurnoService } from '../../admin/turnos/services/turnos-services';
import { Inscripcion } from '../../models/inscripcion.model';
import { Turno } from '../../models/turno';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { NavUsuario } from "../../componentes-compartidos/nav-usuario/nav-usuario";
import { CommonModule } from '@angular/common'; // Asegúrate de importar esto si usas *ngFor o *ngIf

@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard.html',
  standalone: true, // Asumo que es standalone por los imports directos
  imports: [Footer, NavUsuario, CommonModule],
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
    
    // 1. Guarda de seguridad inicial: Si no hay usuario o ID, frenamos todo.
    if (!usuario || !usuario.id) {
      console.warn('Dashboard: No se encontró usuario activo.');
      return;
    }

    this.usuarioId = Number(usuario.id);
    this.usuarioNombre = usuario.nombre;

    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    // Verificamos que tengamos un ID válido antes de llamar al servicio
    if (!this.usuarioId) return;

    this.inscripcionService
      .getInscripcionesByUsuario(this.usuarioId)
      .subscribe({
        next: (data) => {
          this.inscripciones = data;
          this.totalTurnos = data.length;
          
          if (this.totalTurnos > 0) {
            this.cargarTurnos();
          } else {
            this.turnos = []; // Limpiamos turnos si no hay inscripciones
          }
        },
        error: (err) => console.error('Error al cargar inscripciones:', err)
      });
  }

  cargarTurnos(): void {
    this.turnos = [];

    this.inscripciones.forEach(inscripcion => {
      // 2. LA CORRECCIÓN CLAVE: Solo pedimos el turno si id_turno existe y no es undefined
      if (inscripcion && inscripcion.id_turno) {
        this.turnoService
          .getTurnoById(inscripcion.id_turno)
          .subscribe({
            next: (turno) => {
              if (turno) this.turnos.push(turno);
            },
            error: (err) => console.error(`Error cargando turno ${inscripcion.id_turno}:`, err)
          });
      } else {
        console.error('Se encontró una inscripción sin id_turno:', inscripcion);
      }
    });
  }

  cancelarInscripcion(id: number | undefined): void {
    if (!id) return;

    if (confirm('¿Estás seguro de que deseas cancelar esta inscripción?')) {
      this.inscripcionService
        .cancelarInscripcion(id)
        .subscribe({
          next: () => {
            alert('Inscripción cancelada.');
            this.cargarInscripciones();
          },
          error: (err) => console.error('Error al cancelar:', err)
        });
    }
  }
}