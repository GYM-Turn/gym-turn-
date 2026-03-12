import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turno } from '../../models/turno';
import { TurnoService } from '../../admin/turnos/services/turnos-services';
import { ActividadesService } from '../../admin/actividades/services/actividades-service';
import { TurnosFormComponent } from './turnos-form/turnos-form';
import { NavAdmin } from "../../componentes-compartidos/nav-admin/nav-admin";
import { Footer } from "../../componentes-compartidos/footer/footer";

@Component({
  selector: 'app-admin-turnos',
  standalone: true,
  imports: [CommonModule, TurnosFormComponent, NavAdmin, Footer],
  templateUrl: './turnos.html',
  styleUrls: ['./turnos.css']
})
export class AdminTurnosComponent implements OnInit {

  turnos: Turno[] = [];
  mostrarFormulario = false;
  turnoSeleccionado?: Turno;

  constructor(
    private turnoService: TurnoService,
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
            actividad: actividadReal! // 🔥 ahora trae activa real
          };

        });

      });

    });
  }

  eliminarTurno(id: number): void {
    this.turnoService.deleteTurno(id).subscribe(() => {
      this.cargarTurnos();
    });
  }

  editarTurno(turno: Turno): void {
    this.turnoSeleccionado = turno;
    this.mostrarFormulario = true;
  }

  recargarTurnos(): void {
    this.mostrarFormulario = false;
    this.turnoSeleccionado = undefined;
    this.cargarTurnos();
  }

  crearTurno(): void {
    this.turnoSeleccionado = undefined;
    this.mostrarFormulario = true;
  }
}