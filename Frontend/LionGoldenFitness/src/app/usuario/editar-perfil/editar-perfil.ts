import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NavUsuario } from '../../componentes-compartidos/nav-usuario/nav-usuario';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { AuthService } from '../../servicios/auth.service';
import { UsuarioServiceUsuario } from '../../usuario/editar-perfil/services/usuario-service-usuario';
import { Usuario } from '../../models/usuario.model';

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
      telefono: [usuario.telefono],
      password: [''],
      confirmPassword: [''],
      foto: [usuario.foto || null],

    }, {
      validators: this.passwordMatchValidator
    });

    this.previewFoto = usuario.foto
      ? 'http://localhost:8000' + usuario.foto
      : 'assets/default-user.png';
  }

  // ===============================
  // VALIDAR CONTRASEÑAS
  // ===============================

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {

    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (!password && !confirmPassword) return null;

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }

  // ===============================
  // FOTO
  // ===============================

  onFileSelected(event: any) {

    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.previewFoto = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  // ===============================
  // GUARDAR
  // ===============================

  guardarCambios() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('dni', this.form.value.dni);
    formData.append('nombre', this.form.value.nombre);
    formData.append('apellido', this.form.value.apellido);
    formData.append('email', this.form.value.email);
    formData.append('telefono', this.form.value.telefono);

    if (this.form.value.password) {
      formData.append('password', this.form.value.password);
    }

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    const id = String(this.usuarioActual.id);

    this.usuarioService.patchUsuario(id, formData).subscribe({

      next: (usuarioActualizado) => {

        this.authService.setUsuarioActual(usuarioActualizado);

        if (usuarioActualizado.foto) {
          this.previewFoto = 'http://localhost:8000' + usuarioActualizado.foto;
        }

        alert('Perfil actualizado');

      },

      error: () => {
        alert('Error al actualizar');
      }

    });

  }

}