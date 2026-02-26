import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../servicios/auth.service';
import { Rol } from '../../../models/enums/rol';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './iniciar-sesion.html',
  styleUrls: ['./iniciar-sesion.css'],
})
export class IniciarSesion {

  form!: FormGroup;
  error: string | null = null;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  onSubmit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = null;
    this.loading = true;

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: (usuario) => {

        this.loading = false;

        if (usuario.rol === Rol.ADMINISTRADOR) {
          this.router.navigate(['/admin/dashboard']);
        } else if (usuario.rol === Rol.USUARIO) {
          this.router.navigate(['/usuario/dashboard']);
        }

      },
      error: () => {
        this.loading = false;
        this.error = 'Email o contraseña incorrectos';
      }
    });
  }
}
