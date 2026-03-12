import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActividadAdminDTO } from '../../../models/actividad-admin-dto';
import { ActividadesService } from '../services/actividades-service';

@Component({
  selector: 'app-actividades-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actividades-form.html',
  styleUrl: './actividades-form.css',
})
export class ActividadesForm implements OnInit {

  @Input() actividad?: ActividadAdminDTO;
  @Output() cerrar = new EventEmitter<void>();

  private fb = inject(NonNullableFormBuilder);
  private actividadService = inject(ActividadesService);

  form = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    cupos: [1, [Validators.required, Validators.min(1)]],
    cupos_ocupados: [0],
    duracion: [30, [Validators.required, Validators.min(15)]],
    activa: [true]
  });

  ngOnInit(): void {
    if (this.actividad) {
      this.form.patchValue(this.actividad);
    }
  }

  guardar() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: ActividadAdminDTO = {
      ...this.form.getRawValue(),
      id: this.actividad?.id
    };

    if (this.actividad?.id) {
      this.actividadService
        .updateActividad(this.actividad.id, data)
        .subscribe(() => this.cerrar.emit());
    } else {
      this.actividadService
        .createActividad(data)
        .subscribe(() => this.cerrar.emit());
    }
  }

  cancelar() {
    this.cerrar.emit();
  }
}