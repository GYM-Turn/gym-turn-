import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioAdminDTO } from '../../../models/usuario-admin-dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private apiUrl = `${environment.apiUrl}/api/usuarios/`;

  constructor(private http: HttpClient) {}

  // ============================
  // 👤 ADMIN
  // ============================

  getUsuarios(): Observable<UsuarioAdminDTO[]> {
    return this.http.get<UsuarioAdminDTO[]>(this.apiUrl);
  }

  getUsuarioById(id: number): Observable<UsuarioAdminDTO> {
    return this.http.get<UsuarioAdminDTO>(`${this.apiUrl}${id}/`);
  }

  updateUsuario(
    id: number,
    usuario: Partial<UsuarioAdminDTO>
  ): Observable<UsuarioAdminDTO> {
    return this.http.put<UsuarioAdminDTO>(`${this.apiUrl}${id}/`, usuario);
  }

  // ============================
  // 👤 REGISTRO
  // ============================

  createUsuario(usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // ============================
  // 🗑 ELIMINAR
  // ============================

  deleteUsuario(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.apiUrl}${id}/`);
  }
}