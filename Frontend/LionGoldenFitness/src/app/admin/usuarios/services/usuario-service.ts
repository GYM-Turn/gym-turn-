import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioAdminDTO } from '../../../models/usuario-admin-dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  // ============================
  // 👤 MÉTODOS PARA ADMIN (DTO)
  // ============================

  getUsuarios(): Observable<UsuarioAdminDTO[]> {
    return this.http.get<UsuarioAdminDTO[]>(this.apiUrl);
  }

  getUsuarioById(id: string): Observable<UsuarioAdminDTO> {
    return this.http.get<UsuarioAdminDTO>(`${this.apiUrl}/${id}`);
  }

  updateUsuario(
    id: string,
    usuario: Partial<UsuarioAdminDTO>
  ): Observable<UsuarioAdminDTO> {
    return this.http.put<UsuarioAdminDTO>(`${this.apiUrl}/${id}`, usuario);
  }

  // ============================
  // 👤 MÉTODOS PARA REGISTRO
  // ============================

  createUsuario(usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // ============================
  // 🗑 ELIMINAR (ADMIN)
  // ============================

  deleteUsuario(id: string ): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.apiUrl}/${id}`);
  }
}
