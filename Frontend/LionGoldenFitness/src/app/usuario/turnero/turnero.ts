import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { Nav } from "../../componentes-compartidos/nav/nav";
import { Footer } from "../../componentes-compartidos/footer/footer";

interface Turno {
  id: number;
  fecha: string;
  hora: string;
  cupoMaximo: number;
  cuposDisponibles: number;
}

@Component({
  selector: 'app-turnero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Nav, Footer],
  templateUrl: './turnero.html',
  styleUrl: './turnero.css'

})
export class Turnero {

  private fb = inject(FormBuilder);

  turnos: Turno[] = [];

  turnoForm = this.fb.group({
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    cupoMaximo: [10, [Validators.required, Validators.min(1)]]
  });

  crearTurno() {

    if (this.turnoForm.invalid) {
      this.turnoForm.markAllAsTouched();
      return;
    }

    const nuevoTurno: Turno = {
      id: Date.now(),
      fecha: this.turnoForm.value.fecha!,
      hora: this.turnoForm.value.hora!,
      cupoMaximo: this.turnoForm.value.cupoMaximo!,
      cuposDisponibles: this.turnoForm.value.cupoMaximo!
    };

    this.turnos.push(nuevoTurno);

    this.turnoForm.reset({
      cupoMaximo: 10
    });
  }

  reservar(turno: Turno) {
    if (turno.cuposDisponibles > 0) {
      turno.cuposDisponibles--;
    }
  }

}