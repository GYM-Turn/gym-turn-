import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario-service';
import { Rol } from '../../models/enums/rol';
import { UsuarioForm } from '../../admin/usuarios/usuario.form/usuario.form';
import { UsuarioAdminDTO } from '../../models/usuario-admin-dto';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { NavAdmin } from "../../componentes-compartidos/nav-admin/nav-admin";



@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [UsuarioForm, Footer, NavAdmin],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {

  usuarios: UsuarioAdminDTO[] = [];
  mostrarFormulario = false;
  usuarioSeleccionado?: UsuarioAdminDTO;
  Rol = Rol;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  nuevoUsuario() {
    this.usuarioSeleccionado = undefined;
    this.mostrarFormulario = true;
  }

  editarUsuario(usuario: UsuarioAdminDTO) {
    this.usuarioSeleccionado = usuario;
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.cargarUsuarios();
  }

cambiarEstado(usuario: UsuarioAdminDTO) {

  const nuevoEstado = !usuario.activo;

  this.usuarioService
    .updateUsuario(usuario.id!, { activo: nuevoEstado })
    .subscribe(() => {
      usuario.activo = nuevoEstado;
    });

}
}
