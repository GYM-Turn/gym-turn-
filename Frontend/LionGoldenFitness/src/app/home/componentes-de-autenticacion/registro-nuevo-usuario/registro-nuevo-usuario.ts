import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../servicios/auth.service';
import { Usuario } from '../../../models/usuario.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-nuevo-usuario',
  standalone: true, // 👈 MUY IMPORTANTE
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './registro-nuevo-usuario.html',
   styleUrl: './registro-nuevo-usuario.css',
})
export class RegistroNuevoUsuario {  // 👈 nombre profesional

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

  onRegister(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const nuevoUsuario: Usuario = {
      dni: this.form.value.dni,
      user: this.form.value.user,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      fecha_nacimiento: this.form.value.fecha_nacimiento,
      telefono: this.form.value.telefono,
      email: this.form.value.email,
      password: password,
      rol: 1
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
