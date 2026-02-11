import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../servicios/auth.service';
import { Usuario } from '../../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-nuevousuario',
  templateUrl: './registro-nuevo-usuario.html',
})
export class RegistroNuevousuarioComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      user: ['', [Validators.required, Validators.minLength(4)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onRegister() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) {
      return;
    }

    const nuevoUsuario: Usuario = {
      dni: Number(this.form.value.dni),
      user: this.form.value.user,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      fecha_nacimiento: this.form.value.fecha_nacimiento,
      telefono: this.form.value.telefono,
      email: this.form.value.email,
      password: this.form.value.password,
      rol: 1 // siempre usuario normal
    };

    this.authService.registrar(nuevoUsuario).subscribe({
      next: () => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/iniciar-sesion']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar usuario');
      }
    });
  }
}
