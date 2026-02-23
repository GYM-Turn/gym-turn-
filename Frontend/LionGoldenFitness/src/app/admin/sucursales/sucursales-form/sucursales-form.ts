import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sucursal } from '../../../models/sucursal.model';
import { SucursalService } from '../../../servicios/sucursal.service';

@Component({
  selector: 'app-sucursales-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sucursales-form.html',
  styleUrls: ['./sucursales-form.css'],
})
export class SucursalesForm implements OnInit {
  @Input() sucursal?: Sucursal;
  @Output() guardar = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sucursalService: SucursalService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre_sucursal: ['', Validators.required],
      direccion: ['', Validators.required],
    });

    // Modo edición
    if (this.sucursal) {
      this.form.patchValue({
        nombre_sucursal: this.sucursal.nombre_sucursal,
        direccion: this.sucursal.direccion,
      });
    }
  }

  guardarSucursal() {
    if (this.form.invalid) return;

    const sucursalPayload = {
      nombre_sucursal: this.form.value.nombre_sucursal,
      direccion: this.form.value.direccion,
    };

    if (this.sucursal) {
      // 🔥 EDITAR
      this.sucursalService
        .updateSucursal(this.sucursal.id!, {
          ...sucursalPayload,
          id: this.sucursal.id,
        })
        .subscribe(() => this.guardar.emit());
    } else {
      // 🔥 CREAR (IMPORTANTE)
      this.sucursalService.createSucursal(sucursalPayload).subscribe(() => this.guardar.emit());
    }
  }

  cancelar() {
    this.guardar.emit();
  }
}
