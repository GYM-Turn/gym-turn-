import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../admin/usuarios/services/usuario.service';
import { Rol } from '../../../models/enums/rol';
import { UsuarioAdminDTO } from '../../../models/usuario-admin.dto';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './usuario.form.html',
  styleUrls: ['./usuario.form.css'], // 👈 corregido (era styleUrl)
})
export class UsuarioForm implements OnInit {

  // Angular 20 style
  private fb = inject(NonNullableFormBuilder);
  private usuarioService = inject(UsuarioService);

  // 🔥 Ahora usamos el DTO correcto
  @Input() usuario?: UsuarioAdminDTO;
  @Output() cerrar = new EventEmitter<void>();

  Rol = Rol;

  form = this.fb.group({
    dni: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    rol: [Rol.USUARIO],
    creditos: [0],
    activo: [true],
  });

  ngOnInit(): void {
    if (this.usuario) {
      this.form.patchValue(this.usuario);
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const usuarioData: UsuarioAdminDTO = {
      ...this.form.getRawValue(),
      id: this.usuario?.id // 🔥 preservamos id en edición
    };

    if (this.usuario) {
      this.usuarioService
        .updateUsuario(this.usuario.id!, usuarioData)
        .subscribe(() => this.cerrar.emit());
    } else {
      this.usuarioService
        .createUsuario(usuarioData)
        .subscribe(() => this.cerrar.emit());
    }
  }

  cancelar() {
    this.cerrar.emit();
  }
}
