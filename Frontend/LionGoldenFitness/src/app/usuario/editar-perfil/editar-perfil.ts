import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NavUsuario } from '../../componentes-compartidos/nav-usuario/nav-usuario';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { AuthService } from '../../servicios/auth.service';
import { UsuarioServiceUsuario } from '../../usuario/editar-perfil/services/usuario-service-usuario';
import { Usuario } from '../../models/usuario.model';
import { environment } from '../../../environments/environment'; // Importación automática

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavUsuario, Footer],
  templateUrl: './editar-perfil.html',
  styleUrls: ['./editar-perfil.css'],
})
export class EditarPerfil implements OnInit {
  form!: FormGroup;
  usuarioActual!: Usuario;
  previewFoto: string | null = null;
  selectedFile: File | null = null;
  private readonly API_URL = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioServiceUsuario,
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuarioActual();
    if (!usuario?.id) {
      alert('Debe iniciar sesión');
      return;
    }

    this.usuarioActual = usuario;

    this.form = this.fb.group({
      dni: [usuario.dni, Validators.required],
      nombre: [usuario.nombre, Validators.required],
      apellido: [usuario.apellido, Validators.required],
      email: [usuario.email, [Validators.required, Validators.email]],
      telefono: [usuario.telefono || ''],
      password: [''],
      confirmPassword: [''],
    }, {
      validators: this.passwordMatchValidator
    });

    this.previewFoto = this.resolverUrlFoto(usuario.foto || null);
  }

  // MÉTODO CLAVE: Une la URL del environment (Local o Railway) con el path del backend
  private resolverUrlFoto(path: string | null): string {
    if (!path) return 'assets/default-user.png';
    if (path.startsWith('http')) return path;
    return `${this.API_URL}${path}`;
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return (!password || password === confirmPassword) ? null : { passwordMismatch: true };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Validación de tamaño para móviles (10MB máx)
    if (file.size > 10 * 1024 * 1024) {
      alert('La foto es demasiado grande. Máximo 10MB.');
      return;
    }

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => this.previewFoto = reader.result as string;
    reader.readAsDataURL(file);
  }

  guardarCambios() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const values = this.form.value;

    formData.append('dni', values.dni);
    formData.append('nombre', values.nombre);
    formData.append('apellido', values.apellido);
    formData.append('email', values.email);
    formData.append('telefono', values.telefono);

    if (values.password) {
      formData.append('password', values.password);
    }

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    this.usuarioService.patchUsuario(String(this.usuarioActual.id), formData).subscribe({
      next: (usuarioActualizado) => {
        this.authService.setUsuarioActual(usuarioActualizado);
        this.previewFoto = this.resolverUrlFoto(usuarioActualizado.foto || null);
        alert('Perfil actualizado correctamente');
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Error al actualizar el perfil. Verifica el tamaño de la imagen.');
      }
    });
  }
}