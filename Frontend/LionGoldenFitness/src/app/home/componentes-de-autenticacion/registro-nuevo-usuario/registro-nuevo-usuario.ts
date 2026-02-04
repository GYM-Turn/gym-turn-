import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-nuevo-usuario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro-nuevo-usuario.html',
  styleUrl: './registro-nuevo-usuario.css',
})
export class RegistroNuevoUsuario {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // Definimos todos los campos aquí
    this.form = this.fb.group({
      dni: ['', [Validators.required]],
      user: ['', [Validators.required, Validators.minLength(4)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onRegister() {
    if (this.form.valid) {
      // Si el formulario es válido, los datos están en this.form.value
      const datosParaDjango = {
        ...this.form.value,
        rol: 1 // Agregamos el rol fijo aquí
      };
      console.log('Datos listos para Django:', datosParaDjango);
    } else {
      this.form.markAllAsTouched(); // Marca errores visualmente
      console.log('Formulario inválido');
    }
  }
}