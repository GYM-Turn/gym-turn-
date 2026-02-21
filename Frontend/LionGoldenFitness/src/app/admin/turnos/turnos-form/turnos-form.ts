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
      fecha_hora: ['', Validators.required],
      cupo_maximo: ['', [Validators.required, Validators.min(1)]]
    });

    this.cargarDatos();

    // 🔥 Modo edición
    if (this.turno) {
      this.form.patchValue({
        actividadId: this.turno.actividad?.id,
        sucursalId: this.turno.sucursal?.id_sucursal,
        fecha_hora: this.turno.fecha_hora?.substring(0, 16),
        cupo_maximo: this.turno.cupo_maximo
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

  onActividadChange(actividadId: number) {
    const actividad = this.actividades.find(a => a.id == actividadId);
    if (actividad) {
      this.form.patchValue({
        cupo_maximo: actividad.cupos
      });
    }
  }

  guardarTurno() {

    if (this.form.invalid) return;

    const formValue = this.form.value;

    const actividadSeleccionada = this.actividades.find(
      a => a.id == formValue.actividadId
    );

    const sucursalSeleccionada = this.sucursales.find(
      s => s.id_sucursal == formValue.sucursalId
    );

    if (!actividadSeleccionada || !sucursalSeleccionada) return;

    const turnoPayload = {
      actividad: {
        id: actividadSeleccionada.id,
        nombre: actividadSeleccionada.nombre
      },
      sucursal: {
        id_sucursal: sucursalSeleccionada.id_sucursal,
        nombre_sucursal: sucursalSeleccionada.nombre_sucursal
      },
      fecha_hora: formValue.fecha_hora,
      cupo_maximo: formValue.cupo_maximo,
      cupos_disponibles: formValue.cupo_maximo
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