import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      nombre: [usuario.nombre, Validators.required],
      apellido: [usuario.apellido, Validators.required],
      email: [usuario.email, [Validators.required, Validators.email]],
      password: [''],
      telefono: [usuario.telefono],
      foto: [usuario.foto || null],
    });

    this.previewFoto = usuario.foto || null;
  }

  // ===============================
  // 📸 FOTO
  // ===============================

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 2_000_000) {
      alert('La imagen es demasiado grande (máx 2MB)');
      return;
    }

    // 🔥 Solo mostramos preview (no guardamos base64 en backend)
    const reader = new FileReader();

    reader.onload = () => {
      this.previewFoto = reader.result as string;
    };

    reader.readAsDataURL(file);

    // 🔥 Guardamos SOLO el nombre del archivo en el form
    this.form.patchValue({ foto: file.name });
  }

  // ===============================
  // 💾 GUARDAR
  // ===============================

  guardarCambios() {
    if (this.form.invalid) {
      alert('Complete los campos correctamente');
      return;
    }

    // 🔥 Clonamos datos del form
    const datosActualizados: Partial<Usuario> = { ...this.form.value };

    // ❌ No enviar password vacío
    if (!datosActualizados.password || datosActualizados.password.trim() === '') {
      delete datosActualizados.password;
    }

    // 🔥 IMPORTANTE: asegurar que el ID sea STRING
    const id = String(this.usuarioActual.id);

    console.log('ID enviado:', id);
    console.log('Datos enviados:', datosActualizados);

    this.usuarioService.patchUsuario(id, datosActualizados).subscribe({
      next: (usuarioActualizado) => {
        console.log('Respuesta backend:', usuarioActualizado);

        // 🔥 Actualizamos sesión manteniendo ID como string
        this.authService.setUsuarioActual(usuarioActualizado);

        alert('Perfil actualizado correctamente');
      },
      error: (err) => {
        console.error('ERROR PATCH:', err);
        alert('Error al guardar cambios');
      },
    });
  }
}
