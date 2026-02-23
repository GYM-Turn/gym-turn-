import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turno } from '../../models/turno';
import { TurnoService } from '../../admin/turnos/services/turnos-services';
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

  // ✅ SIN null
  turnoSeleccionado?: Turno;

  constructor(private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos() {
    this.turnoService.getTurnos().subscribe(data => {
      this.turnos = data;
    });
  }

  eliminarTurno(id: number) {
    this.turnoService.deleteTurno(id).subscribe(() => {
      this.cargarTurnos();
    });
  }

  editarTurno(turno: Turno) {
    this.turnoSeleccionado = turno;
    this.mostrarFormulario = true;
  }

  recargarTurnos() {
    this.mostrarFormulario = false;
    this.turnoSeleccionado = undefined; // 🔥 NO null
    this.cargarTurnos();
  }

  crearTurno() {
    this.turnoSeleccionado = undefined; // 🔥 NO null
    this.mostrarFormulario = true;
  }
}