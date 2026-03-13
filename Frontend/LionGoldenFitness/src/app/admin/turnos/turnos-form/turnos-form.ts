import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Turno } from '../../../models/turno';
import { Sucursal } from '../../../models/sucursal.model';
import { TurnoService } from '../../turnos/services/turnos-services';
import { ActividadesService } from '../../actividades/services/actividades-service';
import { SucursalService } from '../../../servicios/sucursal.service';
import { ActividadAdminDTO } from '../../../models/actividad-admin-dto';

@Component({
  selector: 'app-turnos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './turnos-form.html',
  styleUrls: ['./turnos-form.css']
})
export class TurnosFormComponent implements OnInit {

  @Input() turno?: Turno;
  @Output() guardar = new EventEmitter<void>();

  form!: FormGroup;

  actividades: ActividadAdminDTO[] = [];
  sucursales: Sucursal[] = [];

  constructor(
    private fb: FormBuilder,
    private turnoService: TurnoService,
    private actividadService: ActividadesService,
    private sucursalService: SucursalService
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      actividadId: ['', Validators.required],
      sucursalId: ['', Validators.required],
      fecha_hora: ['', Validators.required]
    });

    this.cargarDatos();

    // Modo edición
    if (this.turno) {
      this.form.patchValue({
        actividadId: this.turno.actividad?.id,
        sucursalId: this.turno.sucursal?.id,
        fecha_hora: this.turno.fecha_hora?.substring(0, 16)
      });
    }
  }

  cargarDatos() {
    this.actividadService.getActividades().subscribe(data => {
      this.actividades = data;
    });

    this.sucursalService.getSucursales().subscribe(data => {
      this.sucursales = data;
    });
  }

  guardarTurno() {

    if (this.form.invalid) return;

    const formValue = this.form.value;

    const actividadSeleccionada = this.actividades.find(
      a => a.id == formValue.actividadId
    );

    const sucursalSeleccionada = this.sucursales.find(
      s => s.id == formValue.sucursalId
    );

    if (!actividadSeleccionada || !sucursalSeleccionada) return;

    const turnoPayload = {
      actividad_id: actividadSeleccionada.id,
      sucursal_id: sucursalSeleccionada.id,
      fecha_hora: new Date(formValue.fecha_hora).toISOString(),
      cupo_maximo: actividadSeleccionada.cupos,
      cupos_disponibles: actividadSeleccionada.cupos,
    };

    if (this.turno) {
      this.turnoService
        .updateTurno(this.turno.id, turnoPayload)
        .subscribe(() => this.guardar.emit());
    } else {
      this.turnoService
        .createTurno(turnoPayload)
        .subscribe(() => this.guardar.emit());
    }
  }

  cancelar() {
    this.guardar.emit();
  }
}